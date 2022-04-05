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
import { getStoragefavoritesRecipes, setStorageRecipes,
  getStorageRecipes } from '../../helpers/localStorage';
import favoritesFoodsRecipes from '../../helpers/localStorageFood';
import { handleFinishBtnFood } from '../../helpers/handleFinishBtn';
import { handleChangeFood } from '../../helpers/handleChange';

function DetailsOrProgressFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);
  const [changeHeart, setChangeHeart] = useState(false);

  const [inProgressIngredients, setInProgressIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
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

  useEffect(() => {
    const previousStorageRecipes = JSON.parse(localStorage.getItem('Recipes'));
    console.log(previousStorageRecipes)
    if (previousStorageRecipes) {
      const newRecipes = [...startedRecipes, recipes];
      setStorageRecipes(newRecipes);
    } else {
      setStorageRecipes(recipes);
    }
  }, [recipes]);

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

  function handleFinishBtn() {
    const {
      idMeal,
      strArea,
      strTags,
      strCategory,
      strMeal,
      strMealThumb } = foodDetails[0];

    const newDoneRecipe = {
      id: idMeal,
      type: 'food',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags.split(','),
    };
    const previousDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (previousDoneRecipes) {
      const newDoneRecipes = [...previousDoneRecipes, newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
    }
  }
  const verifyButton = (idMeal) => {
    const startedRecipes = getStorageRecipes();

    if (startedRecipes === null) {
      return 'startedRecipes';
    }

    const verificationRecipes = startedRecipes.some((element) => element === idMeal);
    if (verificationRecipes === true) {
      return 'Continue Recipe';
    } if (verificationRecipes === false) {
      return 'Start Recipe';
    }
  };
  
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
          { drinksRecommendations.slice(0, SIX).map((drink, ii) => (
            <div
              key={ ii }
              data-testid={ `${ii}-recomendation-card` }
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strGlass }
                width="200"
                height="200"
              />
            </div>
          ))}
          { (pathname === `/foods/${foods.idMeal}/in-progress`)
            ? (
              <button
                onClick={ () => handleFinishBtnFood(foodDetails[0]) }
                data-testid="finish-recipe-btn"
                type="button"
              >
                Finish Recipe
              </button>)
            : (
              <button
                onClick={ () => {
                  handleStartBtn();
                  setRecipes([...recipes, foods.idMeal]);
                } }
                data-testid="start-recipe-btn"
                type="button"
              >
                {  verifyButton(foods.idMeal) }
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
