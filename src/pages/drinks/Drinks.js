import React, { useState, useEffect } from 'react';
import { drinksRecipes, buttonsCategoriesDrinks } from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Drinks() {
  const [drink, setDrinks] = useState([]);
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    (async () => {
      const { drinks } = await drinksRecipes();
      setDrinks(drinks);
      const data = await buttonsCategoriesDrinks();
      setButtons(data.drinks);
    })();
  }, []);

  const showsNumberDrinks = 12;
  const showsNumberButtons = 5;

  return (
    <div>
      <Header aboutDrink searchButtonIsVisible title="Drinks" />
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
        drink.slice(0, showsNumberDrinks).map(({ strDrinkThumb, strDrink }, index) => (
          <section
            data-testid={ `${index}-recipe-card` }
            key={ strDrink }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt="drinks"
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { strDrink }
            </h3>
          </section>
        ))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
