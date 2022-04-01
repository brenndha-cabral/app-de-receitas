import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFoodDetails } from '../../services/requestApi';
import { setDetails } from '../../redux/actions';
//  import Foods from '../foods/Foods';

function DetailsFoods(props) {
  const [foodDetails, setFoodDetails] = useState([]);

  const { match: { params: { id } }, actionDetails, history } = props;

  useEffect(() => {
    document.title = 'All Tasty | Details Food';
    (async () => {
      const fetchFood = await getFoodDetails(id);
      const { meals } = fetchFood;
      setFoodDetails(meals);
    })();
  },
  [id]);

  if (foodDetails.length === 0) return null;

  const ingredientFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Ingredient')
  )).filter((element) => (element[1] !== ' ' && element[1] !== ''))
    .map((element) => element[1]);

  const measureFilter = Object.entries(foodDetails[0]).filter((element) => (
    element[0].includes('Measure')
  )).filter((element) => (element[1] !== ' ' && element[1] !== ''))
    .map((element) => element[1]);

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
          <button
            onClick={ handleStartBtn }
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

const mapDispatchToProps = (dispatch) => ({
  actionDetails: (payload) => dispatch(setDetails(payload)),
});

DetailsFoods.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
  actionDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(DetailsFoods);
