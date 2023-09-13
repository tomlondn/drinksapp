import { useEffect, useState } from "react";
import { fetchApi } from "../helpers";
import Cocktails from "./Cocktails";

export default function Categorie({ categories, params }) {
  const [cocktails, setCocktails] = useState([]);
  const { catId, id } = params;
  const selectedCategory = categories[catId];
  useEffect(() => {
    async function getCocktails() {
      try {
        if (selectedCategory) {
          const { data } = await fetchApi("filter.php", {
            params: { c: selectedCategory.strCategory },
          });
          if (data.drinks) setCocktails(data.drinks);
        }
      } catch (error) {
        setCocktails([]);

        console.log(error);
      }
    }
    getCocktails();
  }, [selectedCategory]);

  return (
    <>
      <Cocktails cocktails={cocktails} catId={catId} id={id} />
    </>
  );
}
