import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Drinks" />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
