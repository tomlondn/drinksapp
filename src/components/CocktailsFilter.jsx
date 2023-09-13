import CocktailFilterForm from "./CocktailFilterForm";
import FilterPage from "./FilterPage";
import { fetchApi } from "../helpers";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function CocktailsFilter({ params }) {
  const [keywordName, setKeywordName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [cocktails, setCocktails] = useState(null);
  const [noAlcohol, setNoAlcohol] = useState(false);

  const debouncedKeyword = useDebouncedValue(keywordName, 600);
  const { id } = params;
  let filteredCocktails;

  if (cocktails) {
    filteredCocktails = filterCocktails(
      reworkCocktails(cocktails),
      selectedIngredient,
      noAlcohol
    );
  }
  useEffect(() => {
    if (cocktails) {
      const possibleIngredients = Array.from(
        new Set(
          reworkCocktails(cocktails)
            .map((cocktail) => cocktail.ingredients)
            .reduce(
              (accumulator, ingredients) => accumulator.concat(ingredients),
              []
            )
        )
      );
      setIngredients(possibleIngredients);
    }
  }, [cocktails]);

  useEffect(() => {
    if (debouncedKeyword.length < 2) {
      setCocktails([]);
      return;
    }

    async function getFilteredCocktails() {
      try {
        const { data } = await fetchApi("search.php", {
          params: { s: debouncedKeyword },
        });

        setCocktails(data.drinks);
      } catch (error) {
        setCocktails([]);
        console.log(error);
      }
    }
    getFilteredCocktails();
  }, [debouncedKeyword]);

  return (
    <section className="cocktailsFilter">
      {!id && (
        <CocktailFilterForm
          ingredients={ingredients}
          selectedIngredient={selectedIngredient}
          setSelectedIngredient={setSelectedIngredient}
          keywordName={keywordName}
          setKeywordName={setKeywordName}
          noAlcohol={noAlcohol}
          setNoAlcohol={setNoAlcohol}
        />
      )}
      <FilterPage
        cocktails={filteredCocktails}
        id={id}
        keywordNameLength={keywordName.length}
      />
    </section>
  );
}
function filterCocktails(cocktails, selectedIngridient, noAlcohol) {
  const noIngredientFilter = selectedIngridient === "";
  const noAlcoholFilter = selectedIngridient === false;

  const filteredCocktails = cocktails
    .filter(
      ({ ingredients }) =>
        noIngredientFilter || ingredients.includes(selectedIngridient)
    )
    .filter(({ alcoholic }) => noAlcoholFilter || noAlcohol !== alcoholic);

  return filteredCocktails;
}

function getIngredientsArr(cocktailData) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientStr = `strIngredient${i}`;

    if (!cocktailData[ingredientStr]) break;

    ingredients.push(cocktailData[ingredientStr]);
  }

  return ingredients;
}
function reworkCocktails(cocktails) {
  return cocktails.map((cocktail) => {
    return {
      idDrink: cocktail.idDrink,
      strDrink: cocktail.strDrink,
      strDrinkThumb: cocktail.strDrinkThumb,
      ingredients: getIngredientsArr(cocktail),
      alcoholic: cocktail.strAlcoholic === "Alcoholic" ? true : false,
    };
  });
}
