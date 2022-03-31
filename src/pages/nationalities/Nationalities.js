import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { foodsRecipes,
  requestArea,
  requestRecipesByArea } from '../../services/requestApi';

const NUMBER_TWELVE = 12;

function Nationalities() {
  useEffect(() => {
    document.title = 'All Tasty | Nationalities';
  }, []);

  const [areas, setAreas] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const requestAllFoods = async () => {
      const allFoods = await foodsRecipes();
      const { meals } = allFoods;
      const twelveMeals = meals.filter((_item, index) => index < NUMBER_TWELVE);
      setFoods(twelveMeals);
    };

    const requestNationalities = async () => {
      const allAreasObj = await requestArea();
      const allAreas = allAreasObj.map((areaObj) => areaObj.strArea);
      setAreas(allAreas);
    };

    requestAllFoods();
    requestNationalities();
  }, []);

  async function handleFilterByArea({ target }) {
    const { value } = target;
    if (value === 'All') {
      const allRecipes = await foodsRecipes();
      const { meals } = allRecipes;
      const twelveRecipes = meals.filter((_item, index) => index < NUMBER_TWELVE);
      setFoods(twelveRecipes);
    } else {
      const allRecipesByArea = await requestRecipesByArea(value);
      const twelveRecipes = allRecipesByArea
        .filter((_item, index) => index < NUMBER_TWELVE);
      setFoods(twelveRecipes);
    }
  }

  if (areas.length === 0) return null;

  return (
    <div>
      <Header searchButtonIsVisible title="Explore Nationalities" />
      <select
        onChange={ (event) => handleFilterByArea(event) }
        data-testid="explore-by-nationality-dropdown"
      >
        <option>All</option>
        { areas.map((area) => (
          <option
            key={ area }
            data-testid={ `${area}-option` }
          >
            { area }
          </option>
        )) }
      </select>

      { foods.map(({ strMealThumb, strMeal }, index) => (
        <section
          data-testid={ `${index}-recipe-card` }
          key={ strMeal }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt="drinks"
          />
          <h3
            data-testid={ `${index}-card-name` }
          >
            { strMeal }
          </h3>
        </section>
      ))}

      <Footer />
    </div>
  );
}

export default Nationalities;
