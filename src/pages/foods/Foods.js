import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  foodsRecipes,
  buttonsCategoriesFoods,
  requestFilterByCategoryFood,
} from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Foods(props) {
  useEffect(() => {
    document.title = 'All Tasty | Foods';
  }, []);

  const { search } = props;
  let { results } = props;

  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');

  useEffect(() => {
    (async () => {
      const { meals } = await foodsRecipes();
      setFoods(meals);
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

  return (
    <section>
      <Header aboutDrink={ false } searchButtonIsVisible title="Foods" />
      <section>
        { (results.length <= 0 && search !== '')
        && global.alert('Sorry, we haven\'t found any recipes for these filters.') }

        {
          (search === '')
        && (
          <section>
            <button
              type="button"
              data-testid="All-category-filter"
            >
              ALL
            </button>
            {
              buttons.slice(0, SHOW_NUMBER_BUTTOS).map(({ strCategory }) => (
                <button
                  type="button"
                  key={ strCategory }
                  value={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => setCategory(strCategory) }
                >
                  { strCategory }
                </button>
              ))
            }
          </section>
        )
        }
        {
          results.map(({ strMealThumb, strMeal }, index) => (
            <section
              data-testid={ `${index}-recipe-card` }
              key={ strMeal }
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
            </section>
          ))
        }
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
