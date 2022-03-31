import React, { useEffect } from 'react';
import Header from '../../components/header/Header';

function FavoritesRecipes() {
  useEffect(() => {
    document.title = 'All Tasty | Favorites';
  }, []);

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Favorite Recipes" />
    </div>
  );
}

export default FavoritesRecipes;
