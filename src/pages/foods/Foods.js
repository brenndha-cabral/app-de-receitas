import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  foodsRecipes,
  buttonsCategoriesFoods,
  requestFilterByCategoryFood,
} from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import '../css/buttons.css';

function Foods(props) {
  useEffect(() => {
    document.title = 'All Tasty | Foods';
  }, []);

  const { search } = props;
  let { results } = props;

  const history = useHistory();

  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');
  const [all, setAll] = useState([]);
  const [toggleButton, setToggleButton] = useState(null);

  useEffect(() => {
    (async () => {
      const { meals } = await foodsRecipes();
      setFoods(meals);
      setAll(meals);
      const data = await buttonsCategoriesFoods();
      setButtons(data.meals);
    })();
  }, []);

  const SHOW_NUMBER_FOODS = 12;
  const SHOW_NUMBER_BUTTOS = 5;

  if (results.length <= 0 && search === '') {
    results = foods;
  }
  results = results.slice(0, SHOW_NUMBER_FOODS);

  useEffect(() => {
    if (category.length > 0) {
      (async () => {
        const getCategory = await requestFilterByCategoryFood(category);
        setFoods(getCategory.meals);
      })();
    }
  }, [category]);

  const handleButton = () => {
    setFoods(all);
  };

  const handleToggleButton = (strCategory, index) => {
    if (toggleButton === index) {
      setFoods(all);
    } else {
      setCategory(strCategory);
    }
  };

  return (
    <section>
      <Header aboutDrink={ false } searchButtonIsVisible title="Foods" />
      <section>
        { (results.length <= 0 && search !== '')
        && global.alert('Sorry, we haven\'t found any recipes for these filters.') }

        {
          (search === '')
        && (
          <section className="container-buttons-categories">
            <button
              className="buttons-categories"
              type="button"
              data-testid="All-category-filter"
              onClick={ handleButton }
            >
              All
            </button>
            {
              buttons.slice(0, SHOW_NUMBER_BUTTOS).map(({ strCategory }, index) => (
                <button
                  className="buttons-categories"
                  type="button"
                  key={ strCategory }
                  value={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => {
                    handleToggleButton(strCategory, index);
                    setToggleButton(index);
                  } }
                >
                  { strCategory }
                </button>
              ))
            }
          </section>
        )
        }
        <section className="container-recipe-card">
          {
            results.map(({ strMealThumb, strMeal, idMeal }, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ strMeal }
              >
                <button
                  className="recipe-card"
                  type="button"
                  onClick={ () => history.push(`/foods/${idMeal}`) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strMealThumb }
                    alt="drinks"
                  />
                  <h3
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }
                  </h3>
                </button>
              </div>
            ))
          }
        </section>
      </section>
      <Footer />
    </section>
  );
}

const mapStateToProps = ({ results, search }) => ({
  results,
  search,
});

export default connect(mapStateToProps)(Foods);

Foods.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
};
