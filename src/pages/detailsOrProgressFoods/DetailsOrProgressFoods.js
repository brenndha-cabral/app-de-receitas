import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getStoragefavoritesRecipes,
  getStorageProgress } from '../../helpers/localStorage';
import { getFoodDetails, getDrinksRecommendation } from '../../services/requestApi';
import '../css/detailsOrProgress.css';
import convertVideo from '../../helpers/convertVideo';
import { ingredientFilter, measureFilter } from '../../helpers/filterDrinksOrFoodDetails';
import favoritesFoodsRecipes from '../../helpers/localStorageFood';
import { handleFinishBtnFood } from '../../helpers/handleFinishBtn';
import { handleChangeFood } from '../../helpers/handleChange';

function DetailsOrProgressFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);
  const [changeHeart, setChangeHeart] = useState(false);
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

  const toggleHeart = () => {
    const getFavorites = getStoragefavoritesRecipes()
      .some(({ id }) => (
        id === idRecipe
      ));
    setChangeHeart(getFavorites);
  };

  function getInProgressIngredients() {
    const progressRecipes = (getStorageProgress() || {});
    if (Object.keys(progressRecipes.meals).includes(idRecipe)) {
      setInProgressIngredients(progressRecipes.meals[idRecipe]);
    }
  }

  useEffect(() => { toggleHeart(); getInProgressIngredients(); }, []);

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

  return (
    <div>
      { foodDetails.map((foods, index) => (
        <div key={ index }>
          <h1 data-testid="recipe-title">{foods.strMeal}</h1>
          <img
            data-testid="recipe-photo"
            src={ foods.strMealThumb }
            alt="recipe-details"
            className="main_photo"
          />
          <div>
            <button
              className="share-button"
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                navigator.clipboard.writeText((window.location.href)
                  .replace('/in-progress', ''));
                toast('Link copied!');
              } }
            >
              <img
                src={ shareIcon }
                alt="Share recipe"
              />
            </button>
            <Toaster />
            {/* Sugestão do Tonn Turma XP/Tribo B | Referência biblioteca Toaster: https://react-hot-toast.com/  */}
          </div>
          <input
            className={ `favorite ${changeHeart && 'favorite--active'}` }
            data-testid="favorite-btn"
            src={ changeHeart ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite recipe"
            type="image"
            onClick={ () => {
              favoritesFoodsRecipes(foodDetails[0]);
              toggleHeart();
            } }
          />
          <h2
            data-testid="recipe-category"
          >
            { foods.strCategory }
          </h2>
          <section>
            { (pathname === `/foods/${foods.idMeal}/in-progress`)
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
          <p data-testid="instructions">{foods.strInstructions}</p>
          { pathname === `/foods/${foods.idMeal}`
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
          <p>recomendation</p>
          <div className="carousel-wrapper">
            { drinksRecommendations.slice(0, SIX).map((drink, ii) => (
              <div
                key={ ii }
                data-testid={ `${ii}-recomendation-card` }
                className="recommendation_photo"
              >
                <h1 data-testid={ `${ii}-recomendation-title` }>{drink.strDrink}</h1>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strGlass }
                  width="200"
                  height="200"
                />
              </div>
            ))}
          </div>
          { (pathname === `/foods/${foods.idMeal}/in-progress`)
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
                onClick={ handleStartBtn }
                data-testid="start-recipe-btn"
                type="button"
                className="start-recipe"
              >
                Start Recipe
              </button>
            )}
        </div>
      ))}
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
