import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getDrinksDetails, getFoodsRecommendation } from '../../services/requestApi';
import { setDetails } from '../../redux/actions';

function DetailsOrProgressDrinks(props) {
  const [drinksDetails, setDrinksDetails] = useState([]);

  const [foodsRecommendations, setFoodsRecommendations] = useState([]);

  const { match: { params: { id } }, actionDetails, history } = props;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    document.title = 'All Tasty | Details Drink';
    (async () => {
      const fetchDrink = await getDrinksDetails(id);
      const { drinks } = fetchDrink;
      setDrinksDetails(drinks);
      const fetchFoodRecommendation = await getFoodsRecommendation();
      const { meals } = fetchFoodRecommendation;
      setFoodsRecommendations(meals);
    })();
  },
  [id]);

  const six = 6;
  if (drinksDetails.length === 0) return null;

  const ingredientFilter = Object.entries(drinksDetails[0]).filter((element) => (
    element[0].includes('Ingredient')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);

  const measureFilter = Object.entries(drinksDetails[0]).filter((element) => (
    element[0].includes('Measure')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);

  function handleStartBtn() {
    const { idDrink,
      strDrinkThumb,
      strDrink,
      strCategory,
      strInstructions } = drinksDetails[0];
    const payload = {
      id: idDrink,
      name: strDrink,
      photo: strDrinkThumb,
      category: strCategory,
      ingredients: ingredientFilter,
      quantity: measureFilter,
      instructions: strInstructions,
    };
    actionDetails(payload);
    history.push(`/drinks/${idDrink}/in-progress`);
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
            { drink.strAlcoholic }
          </h2>
          <section>
            { (pathname === `/drinks/${drink.idDrink}/in-progress`)
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
            {drink.strInstructions}
          </p>
          { foodsRecommendations.slice(0, six).map((foods, ii) => (

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
                onClick={ handleStartBtn }
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

DetailsOrProgressDrinks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
  actionDetails: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(DetailsOrProgressDrinks);
