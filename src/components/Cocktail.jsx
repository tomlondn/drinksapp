import { useEffect, useState } from "react";
import { fetchApi } from "../helpers";
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";

export default function Cocktail({ params, cocktails }) {
  const [cocktailData, setCocktailData] = useState(null);
  const [errorMessage, setErorMessage] = useState("");
  const { id, catId } = params;
  let nextId, prevId;

  if (cocktails.length > 0) {
    const act = cocktails.findIndex(({ idDrink }) => idDrink === id);
    const nextIndex = next(act, cocktails.length);
    const prevIndex = prev(act);

    nextId = cocktails[nextIndex].idDrink;
    prevId = cocktails[prevIndex].idDrink;
  }

  useEffect(() => {
    async function getCocktailDetail() {
      try {
        const { data } = await fetchApi("lookup.php", { params: { i: id } });
        setCocktailData(data.drinks[0]);
      } catch (error) {
        console.log(error);
        setErorMessage("Ein Problem beim Laden der Daten ist auftetreten");
      }
    }

    getCocktailDetail();
  }, [id]);

  if (errorMessage) return <strong>{errorMessage}</strong>;
  if (!cocktailData) return;

  const ingredientsList = getIngredientsObj(cocktailData);

  const {
    strAlcoholic,
    idDrink,
    strCategory,
    strDrink,
    strDrinkThumb,
    strInstructionsDE,
  } = cocktailData;

  return (
    <section className="cocktail">
      <Helmet>
        <title>{strDrink}</title>
      </Helmet>

      {catId ? (
        <div className="back-to-category">
          <Link to={`/categories/${catId}`}>zurück zu Kategorien</Link>
        </div>
      ) : (
        <div className="back-to-filter">
          <Link to={`/filter`}>zurück zum Filter</Link>
        </div>
      )}

      {cocktails && catId && (
        <div className="cocktail-pag">
          {prevId !== idDrink && (
            <div className="cocktail-pag-button">
              <Link
                className="cocktail-pag-button-prev"
                to={`/categories/${catId}/${prevId}`}
              >
                vorheriger Cocktail
              </Link>
            </div>
          )}

          {nextId !== idDrink && (
            <div className="cocktail-pag-button">
              <Link
                className="cocktail-pag-button-next"
                to={`/categories/${catId}/${nextId}`}
              >
                nächster Cocktail
              </Link>
            </div>
          )}
        </div>
      )}

      <header className="cocktail-detail-header">
        <h1>{strDrink}</h1>
        <span>{strCategory}</span> | <span>{strAlcoholic}</span>
      </header>

      <section className="cocktail-detail">
        <img
          className="cocktail-detail-img"
          src={strDrinkThumb}
          alt={strDrink}
        />

        <div className="cocktail-detail-info">
          <section className="ingredients">
            <header>
              <h2>Zutaten:</h2>
            </header>
            {ingredientsList.map(({ name, quantity }) => (
              <div key={`${name}${quantity}`} className="ingridient">
                <span> {quantity}</span>
                <span> {name}</span>
              </div>
            ))}
          </section>
          <section className="mix-instruction">
            <header>
              <h2>Zubereitung:</h2>
            </header>
            <div>{strInstructionsDE}</div>
          </section>
        </div>
      </section>
    </section>
  );
}

function getIngredientsObj(cocktailData) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredientStr = `strIngredient${i}`;
    const measureStr = `strMeasure${i}`;

    if (!cocktailData[ingredientStr]) break;

    ingredients.push({
      name: cocktailData[ingredientStr],
      quantity: cocktailData[measureStr],
    });
  }

  return ingredients;
}

function prev(act) {
  const i = act - 1 > 0 ? act - 1 : 0;
  return i;
}

function next(act, l) {
  const i = act + 1 < l - 1 ? act + 1 : l - 1;
  return i;
}
