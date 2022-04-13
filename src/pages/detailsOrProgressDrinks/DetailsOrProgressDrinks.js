import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getStorageProgress } from '../../helpers/localStorage';
import { getDrinksDetails, getFoodsRecommendation } from '../../services/requestApi';
import '../css/detailsOrProgress.css';
import { ingredientFilter, measureFilter } from '../../helpers/filterDrinksOrFoodDetails';
import { handleFinishBtnDrink } from '../../helpers/handleFinishBtn';
import { handleChangeDrink } from '../../helpers/handleChange';
import DetailsComponent from '../../components/detailsComponents/DetailsComponent';
import { verifyButtonDrink } from '../../helpers/verifyButton';

function DetailsOrProgressDrinks(props) {
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [foodsRecommendations, setFoodsRecommendations] = useState([]);
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
      setLocalIngredients(progressRecipes.cocktails[idRecipe]);
    }
  }

  useEffect(() => { getInProgressIngredients(); }, []);

  useEffect(() => {
    handleChangeDrink('localIngredients', idRecipe, localIngredients);
  }, [localIngredients]);

  const SIX = 6;

  if (drinksDetails.length === 0) return null;

  const ingredientFiltered = ingredientFilter(drinksDetails);

  const measureFiltered = measureFilter(drinksDetails);

  function handleStartBtn() {
    const { idDrink } = drinksDetails[0];
    history.push(`/drinks/${idDrink}/in-progress`);
  }

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
                          onChange={ (event) => handleLocalIngredients(event) }
                        />
                        { ingredient }
                        { measureFiltered[indexIngredient] }
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
                      className="ingredients-drinks"
                      key={ ingredient }
                      data-testid={ `${indexIngredient}-ingredient-name-and-measure` }
                    >
                      <span>{ ingredient }</span>
                      <span
                        className="measure-drink"
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
      <h3 className="recommended-h3">Recommended</h3>
      <div className="carousel-wrapper">
        { foodsRecommendations.slice(0, SIX).map((foods, ii) => (
          <div
            key={ ii }
            data-testid={ `${ii}-recomendation-card` }
            className="recommendation_photo"
          >
            <img
              src={ foods.strMealThumb }
              alt={ foods.strMeal }
            />
            <h3 className="recomendation-alcoholic">
              { foods.strCategory }
            </h3>
            <h3 data-testid={ `${ii}-recomendation-title` }>{foods.strMeal }</h3>
          </div>
        ))}
      </div>
      { (pathname === `/drinks/${idDrink}/in-progress`)
        ? (
          <button
            onClick={ () => {
              handleFinishBtnDrink(drinksDetails[0]);
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
              handleChangeDrink('button', idRecipe);
            } }
            data-testid="start-recipe-btn"
            type="button"

          >
            { verifyButtonDrink(idDrink) }
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
