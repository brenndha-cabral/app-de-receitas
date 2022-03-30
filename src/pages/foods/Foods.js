import React, { useState, useEffect } from 'react';
import {
  foodsRecipes,
  buttonsCategoriesFoods,
  requestFilterByCategoryFood,
} from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    (async () => {
      const { meals } = await foodsRecipes();
      setFoods(meals);
      const data = await buttonsCategoriesFoods();
      setButtons(data.meals);
    })();
  }, []);

  const showsNumberFoods = 12;
  const showsNumberButtons = 5;

  useEffect(() => {
    if (category.length > 0) {
      (async () => {
        const getCategory = await requestFilterByCategoryFood(category);
        setFoods(getCategory.meals);
      })();
    }
  }, [category]);

  return (
    <div>
      <Header searchButtonIsVisible title="Foods" />
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
        >
          ALL
        </button>
        {
          buttons.slice(0, showsNumberButtons).map(({ strCategory }) => (
            <button
              type="button"
              key={ strCategory }
              value={ strCategory }
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => setCategory(strCategory) }
            >
              { strCategory }
            </button>
          ))
        }
      </section>
      {
        foods.slice(0, showsNumberFoods).map(({ strMealThumb, strMeal }, index) => (
          <section
            data-testid={ `${index}-recipe-card` }
            key={ strMeal }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt="foods"
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { strMeal }
            </h3>
          </section>
        ))
      }
      <Footer />
    </div>
  );
}

export default Foods;
