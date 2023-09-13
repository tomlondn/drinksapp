import { useEffect, useState } from "react";
// import Categorie from "./Categorie";
import { fetchApi } from "../helpers";

import { Link, Route } from "wouter";
import Categorie from "./Categorie";
import { Helmet } from "react-helmet-async";

export default function Categories({ params }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const { data } = await fetchApi("list.php", { params: { c: "list" } });

      setCategories(data.drinks);
    }

    getCategories();
  }, []);

  const selectedCategoryIndex = parseInt(params.catId);

  if (!categories) {
    return null;
  }

  return (
    <>
      <section className="categories">
      <Helmet>
        <title>Kategorien</title>
      </Helmet>
        {categories.map(({ strCategory }, index) => (
          <Link
            to={`/categories/${index}`}
            key={strCategory}
            className={`cat ${
              selectedCategoryIndex === index ? "cat-active" : ""
            }`}
          >
            {strCategory}
          </Link>
        ))}
      </section>

      <Route path="/categories/:catId/:id?">
        {(params) => <Categorie params={params} categories={categories} />}
      </Route>
    </>
  );
}
