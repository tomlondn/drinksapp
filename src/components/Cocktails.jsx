import { Link, Route, useLocation } from "wouter";
import Cocktail from "./Cocktail";
import { Helmet } from "react-helmet-async";

export default function Cocktails({ cocktails, catId, id }) {
  const [, setLocation] = useLocation();
  const routePath = !catId ? "/filter/:id" : "/categories/:catId/:id";

  const title = `Cocktails ${catId ? `-${catId}` : ""}`;

  return (
    <>
      {!id && (
        <section className="cocktails-list">
          <Helmet>
            <title>{title}</title>
          </Helmet>

          {cocktails.map(({ strDrink, strDrinkThumb, idDrink }) => {
            const linkTarget = catId
              ? `/categories/${catId}/${idDrink}`
              : `/filter/${idDrink}`;

            return (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
              <article
                key={idDrink}
                className="one-cocktail"
                onClick={() => setLocation(linkTarget)}
              >
                <header>
                  <h2 key={strDrink}>
                    <Link to={linkTarget}>{strDrink}</Link>
                  </h2>
                  <img src={strDrinkThumb} alt={strDrink} />
                </header>
              </article>
            );
          })}
        </section>
      )}

      <Route path={routePath}>
        {(params) => <Cocktail params={params} cocktails={cocktails} />}
      </Route>
    </>
  );
}
