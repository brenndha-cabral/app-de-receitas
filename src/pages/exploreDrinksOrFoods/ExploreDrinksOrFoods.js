import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { requestRandomDrinkDetails,
  requestRandomFoodDetails } from '../../services/requestApi';
import '../css/exploreDrinksOrFoods.css';

function ExploreDrinksOrFoods() {
  useEffect(() => {
    document.title = 'All Tasty | Explore Recipes';
  }, []);

  const location = useLocation();
  const history = useHistory();
  const { pathname } = location;

  async function handleSurpriseButton() {
    if (pathname === '/explore/foods') {
      const randomDetails = await requestRandomFoodDetails();
      const { idMeal } = randomDetails;

      history.push(`/foods/${idMeal}`);
    } else {
      const randomDetails = await requestRandomDrinkDetails();
      const { idDrink } = randomDetails;

      history.push(`/drinks/${idDrink}`);
    }
  }

  return (
    <div>
      <Header
        searchButtonIsVisible={ false }
        title={ pathname === '/explore/drinks' ? 'Explore Drinks' : 'Explore Foods' }
      />
      <div className="conatiner-foods-drinks">
        <button
          type="button"
          className="explore-by-ingredient"
          onClick={ () => history.push(`${pathname}/ingredients`) }
          data-testid="explore-by-ingredient"
        >
          By Ingredient
        </button>

        { pathname === '/explore/foods' && (
          <button
            type="button"
            className="explore-by-nationality"
            onClick={ () => history.push(`${pathname}/nationalities`) }
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        ) }

        <button
          type="button"
          className="explore-surprise"
          onClick={ handleSurpriseButton }
          data-testid="explore-surprise"
        >
          Surprise me!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreDrinksOrFoods;
