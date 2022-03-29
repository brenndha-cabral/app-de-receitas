import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function DrinksIngredients() {
  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      <Footer />
    </div>
  );
}

export default DrinksIngredients;
