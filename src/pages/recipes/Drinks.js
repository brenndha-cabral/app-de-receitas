import React, { useState, useEffect } from 'react';
import { drinksRecipes } from '../../services/requestApi';

function Drinks() {
  const [drink, setDrinks] = useState([]);

  useEffect(() => {
    (async () => {
      const { drinks } = await drinksRecipes();
      setDrinks(drinks);
    })();
  }, []);

  const showsNumberDrinks = 12;

  return (
    <div>
      <h1>Aqui é a tela de Drinks</h1>
      <section>
        <button
          type="button"
        >
          ALL
        </button>
      </section>
      {
        drink.slice(0, showsNumberDrinks).map(({ strMealThumb, strMeal }) => (
          <section key={ strMeal }>
            <img src={ strMealThumb } alt="drinks" />
            <h3>{ strMeal }</h3>
          </section>
        ))
      }
    </div>
  );
}

export default Drinks;
