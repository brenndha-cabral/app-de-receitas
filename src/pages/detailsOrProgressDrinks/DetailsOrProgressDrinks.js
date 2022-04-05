import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorageProgress } from '../../helpers/localStorage';
import { getDrinksDetails, getFoodsRecommendation } from '../../services/requestApi';
import '../css/detailsOrProgress.css';
import { ingredientFilter, measureFilter } from '../../helpers/filterDrinksOrFoodDetails';
import { handleFinishBtnDrink } from '../../helpers/handleFinishBtn';
import { handleChangeDrink } from '../../helpers/handleChange';
import DetailsComponent from '../../components/detailsComponents/DetailsComponent';

function DetailsOrProgressDrinks(props) {
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [foodsRecommendations, setFoodsRecommendations] = useState([]);
  const [inProgressIngredients, setInProgressIngredients] = useState([]);

  const { match: { params: { id: idRecipe } }, history, location: { pathname } } = props;

  useEffect(() => {
    document.title = 'All Tasty | Details Drink';
    (async () => {
      const fetchDrink = await getDrinksDetails(idRecipe);
      const { drinks } = fetchDrink;
      setDrinksDetails(drinks);
      const fetchFoodRecommendation = await getFoodsRecommendation();
      const { meals } = fetchFoodRecommendation;
      setFoodsRecommendations(meals);
    })();
  },
  [idRecipe]);

  function getInProgressIngredients() {
    const progressRecipes = getStorageProgress();

    if (!progressRecipes) {
      return null;
    }

    if (Object.keys(progressRecipes.cocktails).includes(idRecipe)) {
      setInProgressIngredients(progressRecipes.cocktails[idRecipe]);
    }
  }

  useEffect(() => { getInProgressIngredients(); }, []);

  const SIX = 6;

  if (drinksDetails.length === 0) return null;

  const ingredientFiltered = ingredientFilter(drinksDetails);

  const measureFiltered = measureFilter(drinksDetails);

  function handleStartBtn() {
    const { idDrink } = drinksDetails[0];
    history.push(`/drinks/${idDrink}/in-progress`);
  }

  const verifyButton = (idDrink) => {
    const startedRecipes = getStorageProgress();

    if (startedRecipes === null) {
      return 'Start Recipe';
    }

    const keys = Object.keys(startedRecipes.cocktails).includes(idDrink);

    if (keys) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

  const {
    idDrink,
    strInstructions,
  } = drinksDetails[0];

  return (
    <div>
      <DetailsComponent idRecipe={ idRecipe } drinkDetails={ drinksDetails[0] } />
      <section>
        { (pathname === `/drinks/${idDrink}/in-progress`)
          ? (
            <ol>
              { ingredientFiltered.map((ingredient, indexIngredient) => (
                <li
                  key={ ingredient }
                  data-testid={ `${indexIngredient}-ingredient-step` }
                >
                  <label htmlFor={ ingredient }>
                    <input
                      id={ ingredient }
                      type="checkbox"
                      name={ ingredient }
                      value={ ingredient }
                      checked={ inProgressIngredients.includes(ingredient) }
                      onChange={ (event) => handleChangeDrink(event, idRecipe) }
                    />
                    { ingredient }
                    { measureFiltered[indexIngredient] }
                  </label>
                </li>
              ))}
            </ol>)
          : (
            <div>
              <ol>
                { ingredientFiltered.map((ingredient, indexIngredient) => (
                  <li
                    key={ ingredient }
                    data-testid={ `${indexIngredient}-ingredient-name-and-measure` }
                  >
                    { ingredient }
                    { measureFiltered[indexIngredient] }
                  </li>
                ))}
              </ol>
            </div>
          )}
      </section>
      <p
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      <div className="carousel-wrapper">
        { foodsRecommendations.slice(0, SIX).map((foods, ii) => (
          <div
            key={ ii }
            data-testid={ `${ii}-recomendation-card` }
            className="recommendation_photo"
          >
            <h1 data-testid={ `${ii}-recomendation-title` }>{foods.strMeal }</h1>
            <img
              src={ foods.strMealThumb }
              alt={ foods.strMeal }
              width="200"
              height="200"
            />
          </div>
        ))}
      </div>
      { (pathname === `/drinks/${idDrink}/in-progress`)
        ? (
          <button
            onClick={ () => handleFinishBtnDrink(drinksDetails[0]) }
            data-testid="finish-recipe-btn"
            type="button"
            className="start-recipe"
          >
            Finish Recipe
          </button>)
        : (
          <button
            className="start-recipe"
            onClick={ (event) => {
              handleStartBtn();
              handleChangeDrink(event, idRecipe);
            } }
            data-testid="start-recipe-btn"
            type="button"

          >
            { verifyButton(idDrink) }
          </button>
        )}
    </div>
  );
}

DetailsOrProgressDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object) }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default DetailsOrProgressDrinks;
