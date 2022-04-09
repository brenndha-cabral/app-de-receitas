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
  const [localIngredients, setLocalIngredients] = useState([]);

  const { match: { params: { id: idRecipe } }, history, location: { pathname } } = props;

  function handleLocalIngredients({ target }) {
    const { value } = target;

    setLocalIngredients((prev) => {
      if (prev.includes(value)) return prev.filter((item) => item !== value);
      return [...prev, value];
    });
  }

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
      setLocalIngredients(progressRecipes.meals[idRecipe]);
    }
  }

  useEffect(() => { getInProgressIngredients(); }, []);

  useEffect(() => {
    handleChangeFood('localIngredients', idRecipe, localIngredients);
  }, [localIngredients]);

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
            <div>
              <h3 className="ingredients-h3">Ingredients</h3>
              <div className="ingredient-list-checkbox">
                <ul>
                  { ingredientFiltered.map((ingredient, indexIngredient) => (
                    <li
                      className="ingredients-checkbox"
                      key={ ingredient }
                      data-testid={ `${indexIngredient}-ingredient-step` }
                    >
                      <label
                        className={
                          localIngredients.includes(ingredient) && 'checked-label'
                        }
                        htmlFor={ ingredient }
                      >
                        <input
                          id={ ingredient }
                          type="checkbox"
                          name={ ingredient }
                          value={ ingredient }
                          checked={ localIngredients.includes(ingredient) }
                          onChange={ (event) => {
                            handleLocalIngredients(event);
                          } }
                        />
                        { ingredient }
                        <span>{ measureFiltered[indexIngredient] }</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>)
          : (
            <div>
              <h3 className="ingredients-h3">Ingredients</h3>
              <div className="ingredient-list">
                <ul>
                  { ingredientFiltered.map((ingredient, indexIngredient) => (
                    <li
                      className="ingredients"
                      key={ ingredient }
                      data-testid={ `${indexIngredient}-ingredient-name-and-measure` }
                    >
                      <span>{ ingredient }</span>
                      <span
                        className="measure"
                      >
                        { measureFiltered[indexIngredient] }

                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
      </section>
      <h3 className="instructions-h3">Instructions</h3>
      <p
        className="instructions"
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      { pathname === `/foods/${idMeal}`
          && (
            <div data-testid="video" className="video">
              <h3 className="video-h3">Video</h3>
              <iframe
                width="100%"
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
      <h3 className="recommended-h3">Recommended</h3>
      <div className="carousel-wrapper">
        { drinksRecommendations.slice(0, SIX).map((drink, ii) => (
          <div
            key={ ii }
            data-testid={ `${ii}-recomendation-card` }
            className="recommendation_photo"
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strGlass }
            />
            <h3 className="recomendation-alcoholic">
              { drink.strAlcoholic }
            </h3>
            <h3
              className="recomendation-title"
              data-testid={ `${ii}-recomendation-title` }
            >
              {drink.strDrink }
            </h3>
          </div>
        ))}
      </div>
      { (pathname === `/foods/${idMeal}/in-progress`)
        ? (
          <button
            onClick={ () => {
              handleFinishBtnFood(foodDetails[0]);
              history.push('/done-recipes');
            } }
            data-testid="finish-recipe-btn"
            type="button"
            className="start-continue-finish-recipe"
            disabled={ localIngredients.length < ingredientFiltered.length }
          >
            Finish Recipe
          </button>)
        : (
          <button
            className="start-continue-finish-recipe"
            onClick={ () => {
              handleStartBtn();
              handleChangeFood('button', idRecipe);
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
