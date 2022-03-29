import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function FoodsIngredients() {
  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      <Footer />
    </div>
  );
}

export default FoodsIngredients;
