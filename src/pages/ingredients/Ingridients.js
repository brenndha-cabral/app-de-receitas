import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { requestAllFoodsIngredients,
  requestAllFoodsIngredientsImages,
  requestIngredientFood,
} from '../../services/requestApi';
import { setResultsApi,
  setSearch as setSearchAction } from '../../redux/actions';

const NUMBER_TWELVE = 12;

function Ingredients(props) {
  const { resultsApi, searchInput } = props;
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const allIngredients = await requestAllFoodsIngredients();

      const twelveIngredients = allIngredients
        .filter((_item, index) => index < NUMBER_TWELVE);
      setIngredients(twelveIngredients);

      twelveIngredients.forEach(async (ingredient) => {
        const { strIngredient } = ingredient;
        const image = await requestAllFoodsIngredientsImages(strIngredient);
        setImages((prev) => [...prev.images, image]);
      });
    };

    getIngredients();
  }, []);

  async function handleRedirectAndFilter(ingredientSearch) {
    console.log('rodou');
    const result = requestIngredientFood(ingredientSearch);
    console.log(result);
    resultsApi(result);
    searchInput('');
    history.push('/foods');
    return null;
  }

  if (ingredients.length === 0) return null;

  console.log(images);

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Explore Ingredients" />
      { ingredients.map((ingredient, index) => (
        <button
          type="button"
          onClick={ () => handleRedirectAndFilter(ingredient.strIngredient) }
          key={ ingredient.idIngredient }
          data-testid={ `${index}-ingredient-card` }
        >
          <img
            src={ images[index] }
            alt="foto-ingrediente"
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { ingredient.strIngredient }
          </p>
        </button>
      )) }
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
