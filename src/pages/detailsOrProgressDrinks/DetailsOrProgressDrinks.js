import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { getDrinksDetails, getFoodsRecommendation } from '../../services/requestApi';
import '../css/detailsOrProgress.css';
import { ingredientFilter, measureFilter } from '../../helpers/filterDrinksOrFoodDetails';
import favoritesDrinksRecipes from '../../helpers/localStorageDrink';
import { getStoragefavoritesRecipes } from '../../helpers/localStorage';

function DetailsOrProgressDrinks(props) {
  const [drinksDetails, setDrinksDetails] = useState([]);
  const [foodsRecommendations, setFoodsRecommendations] = useState([]);
  const [changeHeart, setChangeHeart] = useState(false);

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

  const toggleHeart = () => {
    const getFavorites = getStoragefavoritesRecipes()
      .some(({ id }) => (
        id === idRecipe
      ));
    setChangeHeart(getFavorites);
  };

  useEffect(() => { toggleHeart(); }, []);

  const SIX = 6;
  if (drinksDetails.length === 0) return null;

  const ingredientFiltered = ingredientFilter(drinksDetails);

  const measureFiltered = measureFilter(drinksDetails);

  function handleStartBtn() {
    const { idDrink } = drinksDetails[0];
    history.push(`/drinks/${idDrink}/in-progress`);
  }

  function handleFinishBtn() {
    const { idDrink,
      strDrinkThumb,
      strAlcoholic,
      strDrink,
    } = drinksDetails[0];

    const newDoneRecipe = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: [],
    };

    const previousDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (previousDoneRecipes) {
      const newDoneRecipes = [...previousDoneRecipes, newDoneRecipe];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    } else {
      localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
    }
  }

  return (
    <div>
      { drinksDetails.map((drink, index) => (
        <div key={ index }>
          <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
          <img
            data-testid="recipe-photo"
            src={ drink.strDrinkThumb }
            alt="recipe-details"
          />
          <div>
            <button
              className="share-button"
              type="button"
              data-testid="share-btn"
              onClick={ () => {
                navigator.clipboard.writeText(window.location.href);
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
              favoritesDrinksRecipes(drinksDetails[0]);
              toggleHeart();
            } }
          />
          <h2
            data-testid="recipe-category"
          >
            { drink.strAlcoholic }
          </h2>
          <section>
            { (pathname === `/drinks/${drink.idDrink}/in-progress`)
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
            {drink.strInstructions}
          </p>
          { foodsRecommendations.slice(0, SIX).map((foods, ii) => (

            <div
              key={ ii }
              data-testid={ `${ii}-recomendation-card` }
            >
              <img
                src={ foods.strMealThumb }
                alt={ foods.strMeal }
                width="200"
                height="200"
              />
            </div>
          ))}
          { (pathname === `/drinks/${drink.idDrink}/in-progress`)
            ? (
              <button
                onClick={ handleFinishBtn }
                data-testid="finish-recipe-btn"
                type="button"
              >
                Finish Recipe
              </button>)
            : (
              <button
                onClick={ handleStartBtn }
                data-testid="start-recipe-btn"
                type="button"
              >
                Start Recipe
              </button>
            )}
        </div>
      ))}
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
