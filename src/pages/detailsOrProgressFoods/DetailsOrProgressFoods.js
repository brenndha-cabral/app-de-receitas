import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getFoodDetails, getDrinksRecommendation } from '../../services/requestApi';
import { setDetails } from '../../redux/actions';

function DetailsOrProgressFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [drinksRecommendations, setDrinksRecommendations] = useState([]);

  const { match: { params: { id } }, actionDetails, history } = props;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    document.title = 'All Tasty | Details Food';
    (async () => {
      const fetchFood = await getFoodDetails(id);
      const { meals } = fetchFood;
      setFoodDetails(meals);
      const fetchDrinksRecommendation = await getDrinksRecommendation();
      const { drinks } = fetchDrinksRecommendation;
      setDrinksRecommendations(drinks);
    })();
  },
  [id]);

  const six = 6;
  if (foodDetails.length === 0) return null;

  const ingredientFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Ingredient')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);

  const measureFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Measure')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);

  // const sourceFilter =

  //  Referência: https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
  function convertVideo(url) {
    const ELEVEN = 11;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === ELEVEN)
      ? match[2]
      : null;
  }

  const videoId = convertVideo(foodDetails[0].strYoutube);
  const iframeMarkup = `https://www.youtube.com/embed/${videoId}`;

  function handleStartBtn() {
    const { idMeal,
      strMealThumb,
      strMeal,
      strCategory,
      strInstructions } = foodDetails[0];
    const payload = {
      id: idMeal,
      name: strMeal,
      photo: strMealThumb,
      category: strCategory,
      ingredients: ingredientFilter,
      quantity: measureFilter,
      instructions: strInstructions,
    };
    actionDetails(payload);
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
            { (pathname === `/foods/${foods.idMeal}/in-progress`)
              ? (
                <ol>
                  { ingredientFilter.map((ingredient, indexIngredient) => (
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
                        {' '}
                        { ingredient }
                        {' '}
                        { measureFilter[indexIngredient] }
                      </label>
                    </li>
                  ))}
                </ol>)
              : (
                <div>
                  <ol>
                    { ingredientFilter.map((ingredient, indexIngredient) => (
                      <li
                        key={ ingredient }
                        data-testid={ `${indexIngredient}-ingredient-name-and-measure` }
                      >
                        {' '}
                        { ingredient }
                        {' '}
                        { measureFilter[indexIngredient] }
                      </li>
                    ))}

                  </ol>
                </div>
              )}
          </section>
          <p
            data-testid="instructions"
          >
            {foods.strInstructions}
          </p>
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
          { drinksRecommendations.slice(0, six).map((drink, ii) => (

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

const mapDispatchToProps = (dispatch) => ({
  actionDetails: (payload) => dispatch(setDetails(payload)),
});

DetailsOrProgressFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
  actionDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(DetailsOrProgressFoods);
