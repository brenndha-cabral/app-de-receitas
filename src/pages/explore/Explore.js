import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import '../css/explore.css';

function Explore() {
  useEffect(() => {
    document.title = 'All Tasty | Explore';
  }, []);

  const history = useHistory();

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore" />
      <div className="container-explore">
        <button
          type="button"
          className="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          data-testid="explore-foods"
        >
          Explore Foods
        </button>
        <button
          type="button"
          className="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          data-testid="explore-drinks"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
