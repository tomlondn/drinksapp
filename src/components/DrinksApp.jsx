import CocktailsFilter from "./CocktailsFilter";
import Categories from "./Categories";
import { Link, Route } from "wouter";
import Home from "./Home";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function DrinksApp() {
  useDocumentTitle("Drinks App");

  return (
    <section className="main-app">
      <header className="main-header">
        <h1 className="app-headline">Drinks App</h1>
      </header>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/categories">Drinks nach Kategorien </Link>
        <Link to="/filter">Drinks Suche</Link>
      </nav>

      <section className="content-area">
        <Route path="/" component={Home}></Route>
        <Route path="/categories/:catId?/:id?" component={Categories}></Route>
        <Route path="/filter/:id?" component={CocktailsFilter}></Route>
      </section>
    </section>
  );
}
