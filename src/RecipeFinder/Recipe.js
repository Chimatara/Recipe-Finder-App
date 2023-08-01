import React, { useEffect, useState } from "react";
import "../RecipeFinder/recipe.css";

const Recipe = () => {
  const [input, setInput] = useState("");
  const [update, setUpdated] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [data, setData] = useState([]);

  const handleOnChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    setInput(searchText);

    const filteredRecipes = data.filter((item) =>
      item.recipe.label.toLowerCase().includes(searchText)
    );
    setUpdated(filteredRecipes);
  };

  const handleClick = (selectedRecipe) => {
    setSelectedRecipe(selectedRecipe);
    setShowRecipeDetails(true);
    console.log("clicked");
  };

  useEffect(() => {
    let url =
      "https://api.edamam.com/search?q=chicken&app_id=a040ebd2&app_key=1931d04d4fcf18b60cf67a9cd594010b";
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setUpdated(data.hits); // Save all recipes in a state variable
        setData(data.hits);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);
  return (
    <div>
      <h1>Learn How to Cook your Favourite Meal</h1>
      <p className="tag">
        We have just the right recipe for your favourite meal.
      </p>

      <form>
        <div className="input-wrapper">
          <input
            id="input"
            type="text"
            placeholder="Search food..."
            onChange={handleOnChange}
            value={input}
          />
          <button id="btn">Search</button>
        </div>
        {loading && !error && <p className="loading">Loading...</p>}
        {error && (
          <p className="error">{`We encountered an error fetching the data...`}</p>
        )}
      </form>

      <div className="food-items">
        {update.map((item) => {
          return (
            <div className="grid">
              <span className="label">{item.recipe.label}</span>
              <div className="food-list">
                <img className="image" src={item.recipe.image} alt="food" />
                <button style={{ width: "100px" }} onClick={() => handleClick(item.recipe)}>
                  Show Recipe
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showRecipeDetails && (
        <div className="recipe-details">
          <h2>{selectedRecipe.label}</h2>
          <img src={selectedRecipe.image} alt="food" />
          <h3><span>Ingredients:</span></h3>
          <ul>
            {selectedRecipe.ingredientLines.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <button className="close-btn" onClick={() => setShowRecipeDetails(false)}>Hide Recipe</button>
        </div>
      )}

    </div>
  );
};

export default Recipe;
