import React, { useEffect } from 'react';
import Header from '../../components/header/Header';

function DoneRecipes() {
  useEffect(() => {
    document.title = 'All Tasty | Done Recipes';
  }, []);

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Done Recipes" />
    </div>
  );
}

export default DoneRecipes;
