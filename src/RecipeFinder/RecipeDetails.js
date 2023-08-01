import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import FetchAPI from './FetchAPI';

const RecipeDetails = () => {
    const { index } = useParams();
  const { data, loading, error } = FetchAPI();

  const selectedRecipe = data[index];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {selectedRecipe ? (
        <div>
          <h1>{selectedRecipe.recipe.label}</h1>
          {/* Render the rest of the recipe details here */}
        </div>
      ) : (
        <div>No recipe found for this index.</div>
      )}
    </div>
  );
}

export default RecipeDetails