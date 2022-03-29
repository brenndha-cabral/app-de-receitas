import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Drinks() {
  return (
    <div>
      <Header
        aboutDrink
        searchButtonIsVisible
        title="Drinks"
      />
      <Footer />
    </div>
  );
}

export default Drinks;
