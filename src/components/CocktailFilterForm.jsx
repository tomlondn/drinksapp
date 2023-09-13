export default function CocktailFilterForm({
  ingredients,
  selectedIngredient,
  setSelectedIngredient,
  keywordName,
  setKeywordName,
  noAlcohol,
  setNoAlcohol,
}) {
  return (
    <form className="cocktails-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="search-name">Suche in Cocktail-Namen:</label>
      <input
        type="search"
        id="search-name"
        name="keywordSearch"
        value={keywordName}
        onChange={(e) => setKeywordName(e.target.value)}
      />

      {keywordName.length > 1 && (
        <section className="more-filters">
          <header>
            <h3>Erweiterte Filter:</h3>
          </header>

          <label htmlFor="search-ingridient">Zutat Name:</label>
          <select
            value={selectedIngredient}
            id="search-ingridient"
            onChange={(e) => setSelectedIngredient(e.target.value)}
          >
            <option value="">-- keine ausgewählt</option>
            {ingredients
              .sort((a, b) => a.localeCompare(b))
              .map((ingredient, index) => (
                <option key={index} value={ingredient}>
                  {ingredient}
                </option>
              ))}
          </select>

          <div>
            <label>
              <input
                type="checkbox"
                checked={noAlcohol}
                onChange={(e) => setNoAlcohol(e.target.checked)}
              />
              Ohne-Alkohol
            </label>
          </div>
        </section>
      )}
    </form>
  );
}
