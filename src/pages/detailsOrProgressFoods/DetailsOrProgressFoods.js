import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorageProgress } from '../../helpers/localStorage';
import { getFoodDetails, getDrinksRecommendation } from '../../services/requestApi';
import '../css/detailsOrProgress.css';
import convertVideo from '../../helpers/convertVideo';
import { ingredientFilter, measureFilter } from '../../helpers/filterDrinksOrFoodDetails';
import { handleFinishBtnFood } from '../../helpers/handleFinishBtn';
import { handleChangeFood } from '../../helpers/handleChange';
import DetailsComponent from '../../components/detailsComponents/DetailsComponent';

function DetailsOrProgressFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);
  const [inProgressIngredients, setInProgressIngredients] = useState([]);

  const { match: { params: { id: idRecipe } }, history, location: { pathname } } = props;

  useEffect(() => {
    document.title = 'All Tasty | Details Food';
    (async () => {
      const fetchFood = await getFoodDetails(idRecipe);
      const { meals } = fetchFood;
      setFoodDetails(meals);
      const fetchDrinksRecommendation = await getDrinksRecommendation();
      const { drinks } = fetchDrinksRecommendation;
      setDrinksRecommendations(drinks);
    })();
  },
  [idRecipe]);

  function getInProgressIngredients() {
    const progressRecipes = getStorageProgress();

    if (!progressRecipes) {
      return null;
    }

    if (Object.keys(progressRecipes.meals).includes(idRecipe)) {
      setInProgressIngredients(progressRecipes.meals[idRecipe]);
    }
  }

  useEffect(() => { getInProgressIngredients(); }, []);

  const SIX = 6;

  if (foodDetails.length === 0) return null;

  const ingredientFiltered = ingredientFilter(foodDetails);

  const measureFiltered = measureFilter(foodDetails);

  const videoId = convertVideo(foodDetails[0].strYoutube);
  const iframeMarkup = `https://www.youtube.com/embed/${videoId}`;

  function handleStartBtn() {
    const { idMeal } = foodDetails[0];
    history.push(`/foods/${idMeal}/in-progress`);
  }

  const verifyButton = (idMeal) => {
    const startedRecipes = getStorageProgress();

    if (startedRecipes === null) {
      return 'Start Recipe';
    }

    const keys = Object.keys(startedRecipes.meals).includes(idMeal);

    if (keys) {
      return 'Continue Recipe';
    }
    return 'Start Recipe';
  };

  const {
    idMeal,
    strInstructions,
  } = foodDetails[0];

  return (
    <div>
      <DetailsComponent idRecipe={ idRecipe } foodDetails={ foodDetails[0] } />

      <section>
        { (pathname === `/foods/${idMeal}/in-progress`)
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
                      onChange={ (event) => handleChangeFood(event, idRecipe) }
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
      { pathname === `/foods/${idMeal}`
          && (
            <div data-testid="video">
              <iframe
                width="560"
                height="315"
                src={ iframeMarkup }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay;
              clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
      <div className="carousel-wrapper">
        { drinksRecommendations.slice(0, SIX).map((drink, ii) => (
          <div
            key={ ii }
            data-testid={ `${ii}-recomendation-card` }
            className="recommendation_photo"
          >
            <h1 data-testid={ `${ii}-recomendation-title` }>{drink.strDrink }</h1>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strGlass }
              width="200"
              height="200"
            />
          </div>
        ))}
      </div>
      { (pathname === `/foods/${idMeal}/in-progress`)
        ? (
          <button
            onClick={ () => handleFinishBtnFood(foodDetails[0]) }
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
              handleChangeFood(event, idRecipe);
            } }
            data-testid="start-recipe-btn"
            type="button"

          >
            { verifyButton(idMeal) }
          </button>
        )}
    </div>
  );
}

DetailsOrProgressFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object) }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default DetailsOrProgressFoods;
