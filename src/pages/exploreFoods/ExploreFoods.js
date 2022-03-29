import React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Foods" />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
