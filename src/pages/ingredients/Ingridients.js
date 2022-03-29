import React from 'react';
// import { useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Ingredients() {
  // const location = useLocation();
  // const { pathname } = location;

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      <Footer />
    </div>
  );
}

export default Ingredients;
