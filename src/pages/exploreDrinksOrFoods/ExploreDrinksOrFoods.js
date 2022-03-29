import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function ExploreDrinksOrFoods() {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div>
      <Header
        searchButtonIsVisible={ false }
        title={ pathname === '/explore/drinks' ? 'Explore Drinks' : 'Explore Foods' }
      />

      <button
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient

      </button>
      <button
        type="button"
        disabled={ pathname === '/explore/drinks' }
        data-testid="explore-by-nationality"
      >
        By Nationality

      </button>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!

      </button>
      <Footer />
    </div>
  );
}

export default ExploreDrinksOrFoods;
