import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { foodsRecipes, buttonsCategoriesFoods } from '../../services/requestApi';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

function Foods(props) {
  const { search } = props;
  let { results } = props;

  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);

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
                  data-testid={ `${strCategory}-category-filter` }
                >
                  { strCategory }
                </button>
              ))
            }
          </section>
        )
        }
        {/* Referência <Redirect push /> | Iria ser usado o history para redirecionar mas por causa de avisos, foi mais adequado usar o <Redirect /> | Link: https://stackoverflow.com/questions/64306989/cannot-update-during-an-existing-state-transition-such-as-within-render-ren */}
        {
          results.map(({ strMealThumb, strMeal, idMeal }, index) => (
            (results.length === 1)
              ? <Redirect key={ strMeal } push to={ `/foods/${idMeal}` } />
              : (
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
              )
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
