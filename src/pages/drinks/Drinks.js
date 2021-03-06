import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/header/Header';
import {
  drinksRecipes,
  buttonsCategoriesDrinks,
  requestFilterByCategoryDrinks,
} from '../../services/requestApi';
import Footer from '../../components/footer/Footer';

function Drinks(props) {
  useEffect(() => {
    document.title = 'All Tasty | Drinks';
  }, []);

  const { search } = props;
  let { results } = props;

  const history = useHistory();

  const [allDrinks, setAllDrinks] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');
  const [all, setAll] = useState([]);
  const [toggleButton, setToggleButton] = useState(null);

  useEffect(() => {
    (async () => {
      const { drinks } = await drinksRecipes();
      setAllDrinks(drinks);
      setAll(drinks);
      const data = await buttonsCategoriesDrinks();
      setButtons(data.drinks);
    })();
  }, []);

  const SHOW_NUMBER_DRINKS = 12;
  const SHOW_NUMBER_BUTTOS = 5;

  if (results.length <= 0 && search === '') {
    results = allDrinks;
  }
  results = results.slice(0, SHOW_NUMBER_DRINKS);

  useEffect(() => {
    if (category.length > 0) {
      (async () => {
        const getCategory = await requestFilterByCategoryDrinks(category);
        setAllDrinks(getCategory.drinks);
      })();
    }
  }, [category]);

  const handleButton = () => {
    setAllDrinks(all);
  };

  const handleToggleButton = (strCategory, index) => {
    if (toggleButton === index) {
      setAllDrinks(all);
    } else {
      setCategory(strCategory);
    }
  };

  return (
    <section>
      <Header aboutDrink searchButtonIsVisible title="Drinks" />
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
            results.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
              <div
                key={ strDrink }
                data-testid={ `${index}-recipe-card` }
              >
                <button
                  className="recipe-card"
                  type="button"
                  onClick={ () => history.push(`/drinks/${idDrink}`) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ strDrinkThumb }
                    alt="drinks"
                  />
                  <h3
                    data-testid={ `${index}-card-name` }
                  >
                    { strDrink }
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

export default connect(mapStateToProps)(Drinks);

Drinks.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.string.isRequired,
};
