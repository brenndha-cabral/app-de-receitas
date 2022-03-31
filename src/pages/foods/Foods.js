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

function Foods(props) {
  const { search } = props;
  let { results } = props;

  const history = useHistory();

  const [foods, setFoods] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [category, setCategory] = useState('');
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState(false);
  // const [buttonIndex, setButtonIndex] = useState();

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

  // const handleFilterButton = (strCategory, index) => {
  //   if (buttonIndex.includes(index)) {
  //     setFoods(all);
  //     setButtonIndex([...buttonIndex, index]);
  //     buttonIndex.splice(0, 1);
  //   }
  //   if (!buttonIndex.includes(index)) {
  //     setCategory(strCategory);
  //     setButtonIndex([...buttonIndex, index]);
  //     buttonIndex.splice(0, 1);
  //   }
  // };

  const handleFilterButton = (strCategory) => {
    if (filter === false) {
      setFilter(true);
      setCategory(strCategory);
    }
    if (filter === true) {
      setFilter(false);
      setFoods(all);
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
                  value={ strCategory }
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
          results.map(({ strMealThumb, strMeal, idMeal }, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ strMeal }
            >
              <button
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
