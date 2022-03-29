import React, { useState, useEffect } from 'react';
import { foodsRecipes } from '../../services/requestApi';

function Foods() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    (async () => {
      const { meals } = await foodsRecipes();
      setFoods(meals);
    })();
  }, []);

  const showsNumberFoods = 12;

  return (
    <div>
      <h1>Aqui é a tela de Foods</h1>
      <section>
        <button
          type="button"
        >
          ALL
        </button>
      </section>
      {
        foods.length > 0 && (
          foods.slice(0, showsNumberFoods).map(({ strMealThumb, strMeal }) => (
            <section key={ strMeal }>
              <img src={ strMealThumb } alt="foods" />
              <h3>{ strMeal }</h3>
            </section>
          ))
        )
      }
    </div>
  );
}

export default Foods;
