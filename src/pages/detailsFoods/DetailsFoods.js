import { match } from 'react-router-dom';
import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
import { getFoodDetails } from '../../services/requestApi';
import Foods from '../foods/Foods';

function DetailsFoods() {
  const [foodDetails, setFoodDetails] = useState([]);

  // const { match } = props;

  useEffect(() => {
    document.title = 'All Tasty | Details Food';
    (async () => {
      const fetchFood = await getFoodDetails(id);
      setFoodDetails(fetchFood);
      console.log(match);
    })();
  },
  []);

  const ingredientFilter = foodDetails
    .filter((element) => element.Object.key.includes('Ingredient'));

  const measureFilter = foodDetails
    .filter((element) => element.Object.key.includes('Measure'));

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
                  </li>
                ))}

              </ol>
            </div>
            <div>
              <ol>
                { measureFilter.map((measure, i) => (
                  <li
                    key={ measure }
                    data-testid={ `${i}-ingredient-name-and-measure` }
                  >
                    {' '}
                    { measure }
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
            <video
              data-testid="video"
              src={ foods.strYoutube }
            />
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
// DetailsFoods.propTypes = {
// match: PropTypes.arrayOf(PropTypes.object).isRequired,
// };
export default DetailsFoods;
