import React from "react";
import ReactDOM from "react-dom/client";
import DrinksApp from "./components/DrinksApp";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <DrinksApp />
    </HelmetProvider>
  </React.StrictMode>
);
