import React, { useState, useEffect } from 'react';
import { foodsRecipes, buttonsCategoriesFoods } from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Foods() {
  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);

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
              data-testid={ `${strCategory}-category-filter` }
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
