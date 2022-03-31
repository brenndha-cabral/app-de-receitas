import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodDetails } from '../../services/requestApi';
//  import Foods from '../foods/Foods';

function DetailsFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);

  const { match: { params: { id } } } = props;

  useEffect(() => {
    document.title = 'All Tasty | Details Food';
    (async () => {
      const fetchFood = await getFoodDetails(id);
      const { meals } = fetchFood;
      // console.log(meals);
      setFoodDetails(meals);
      // console.log(meals);
    })();
  },
  []);

  if (foodDetails.length === 0) return null;

  const ingredientFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Ingredient')
  )).filter((element) => (element[1].length !== 0))
    .map((element) => element[1]);

  const measureFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Measure')
  )).filter((element) => (element[1] !== ' '))
    .map((element) => element[1]);

  return (
    <div>
      { foodDetails.map((foods, index) => (
        <div key={ index }>
          <h1 data-testid="recipe-title">{foods.strMeal}</h1>
          <img
            data-testid="recipe-photo"
            src={ foods.strMealThumb }
            alt="recipe-details"
          />
          <button
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
          >
            Favorite
          </button>
          <h2
            data-testid="recipe-category"
          >
            { foods.strCategory }
          </h2>
          <section>
            <div>
              <ol>
                { ingredientFilter.map((ingredient, i) => (
                  <li
                    key={ ingredient }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {' '}
                    { ingredient }
                    { measureFilter[i] }
                  </li>
                ))}

              </ol>
            </div>
          </section>
          <p
            data-testid="instructions"
          >
            {foods.strInstructions}
          </p>
          <div>
            {/*             <video
              data-testid="video"
              src={ foods.strYoutube }
            /> */}
          </div>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            Start Recipe
          </button>
          <div>
            {}
          </div>
        </div>
      ))}
    </div>
  );
}

DetailsFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
};

export default DetailsFoods;
