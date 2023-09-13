import Cocktails from "./Cocktails";
export default function FilterPage({ cocktails, id }) {
  if (!cocktails || cocktails.length === 0) {
    return <strong>Keine Daten!</strong>;
  }

  return (
    <section className="filteredCocktails">
      {!id && (
        <header>
          <h2>Ergebnisse</h2>
        </header>
      )}
      <Cocktails cocktails={cocktails} id={id} />
    </section>
  );
}
