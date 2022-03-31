import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { requestAllFoodsIngredients,
  requestIngredientFood,
  requestAllDrinksIngredients,
  requestIngredientDrink,
} from '../../services/requestApi';
import { setResultsApi,
  setSearch as setSearchAction } from '../../redux/actions';

const NUMBER_TWELVE = 12;
function Ingredients(props) {
  useEffect(() => {
    document.title = 'All Tasty | Ingredients';
  }, []);

  const location = useLocation();
  const { resultsApi, searchInput } = props;
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const { pathname } = location;

    const getIngredients = async () => {
      let allIngredients;
      if (pathname === '/explore/foods/ingredients') {
        allIngredients = await requestAllFoodsIngredients();
        console.log(allIngredients, 'aquiiiiii');
      } else {
        allIngredients = await requestAllDrinksIngredients();
        console.log(allIngredients, 'aquiiiiii2');
      }

      const twelveIngredients = allIngredients
        .filter((_item, index) => index < NUMBER_TWELVE);
      setIngredients(twelveIngredients);
      console.log(twelveIngredients);
    };

    getIngredients();
  }, [location]);

  async function handleFoodRedirect(ingredientSearch) {
    const result = await requestIngredientFood(ingredientSearch);
    resultsApi(result);

    searchInput('');
    history.push('/foods');
    return null;
  }

  async function handleDrinkRedirect(ingredientSearch) {
    const result = await requestIngredientDrink(ingredientSearch);
    resultsApi(result);

    searchInput('');
    history.push('/drinks');
    return null;
  }

  function handleImageURL(ingredientName) {
    const { pathname } = location;
    if (pathname === '/explore/foods/ingredients') {
      return `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;
    }
    return `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
  }

  if (ingredients.length === 0) return null;

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      { ingredients.map((ingredient, index) => {
        const { strIngredient } = ingredient;
        const { strIngredient1 } = ingredient;

        return (
          <div
            tabIndex={ 0 }
            role="button"
            onKeyUp={ () => null }
            onClick={
              strIngredient
                ? () => handleFoodRedirect(strIngredient)
                : () => handleDrinkRedirect(strIngredient1)
            }
            key={ strIngredient || strIngredient1 }
            data-testid={ `${index}-ingredient-card` }
          >
            <img
              src={ handleImageURL(strIngredient || strIngredient1) }
              alt="foto-ingrediente"
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { strIngredient || strIngredient1 }
            </p>
          </div>);
      }) }
      <Footer />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  resultsApi: (result) => {
    dispatch(setResultsApi(result));
  },
  searchInput: (search) => {
    dispatch(setSearchAction(search));
  },
});

Ingredients.propTypes = {
  resultsApi: PropTypes.func.isRequired,
  searchInput: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ingredients);
