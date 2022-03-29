import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Explore() {
  const history = useHistory();

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore" />
      <button
        type="button"
        onClick={ () => history.push('/explore/foods') }
        data-testid="explore-foods"

      >
        Explore Foods
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore/drinks') }
        data-testid="explore-drinks"
      >
        Explore Drinks

      </button>
      <Footer />
    </div>
  );
}

export default Explore;
