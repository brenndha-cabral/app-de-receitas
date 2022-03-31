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
  const { search } = props;
  let { results } = props;

  const history = useHistory();

  const [allDrinks, setAllDrinks] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState(false);

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

  const handleFilterButton = (strCategory) => {
    if (filter === false) {
      setFilter(true);
      setCategory(strCategory);
    }
    if (filter === true) {
      setFilter(false);
      setAllDrinks(all);
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
          <section>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ handleButton }
            >
              ALL
            </button>
            {
              buttons.slice(0, SHOW_NUMBER_BUTTOS).map(({ strCategory }) => (
                <button
                  type="button"
                  key={ strCategory }
                  data-testid={ `${strCategory}-category-filter` }
                  onClick={ () => handleFilterButton(strCategory) }
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
          results.map(({ strDrinkThumb, strDrink, idDrink }, index) => (
            <div
              key={ strDrink }
              data-testid={ `${index}-recipe-card` }
            >
              <button
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
