import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';

const simulation = [
  {
    id: '1',
    type: 'meal',
    nationality: 'British',
    category: 'Dessert',
    alcoholicOrNot: '',
    name: 'Chelsea Buns',
    image: 'https://www.themealdb.com/images/media/meals/vqpwrv1511723001.jpg',
    doneDate: '20/10/2019',
    tags: ['Bun', 'Baking'],
  },
  {
    id: '2',
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'alcoholic',
    name: 'Bible Belt',
    image: 'https://www.thecocktaildb.com/images/media/drink/6bec6v1503563675.jpg',
    doneDate: '10/06/2019',
    tags: [],
  },
];

function DoneRecipes(props) {
  const { history } = props;
  const [recipes, setRecipes] = useState(simulation);
  const [isVisible, setIsVisible] = useState(false);

  console.log(history);

  useEffect(() => {
    document.title = 'All Tasty | Done Recipes';
  }, []);

  /*   useEffect(() => {
    const localRecipes = localStorage.getItem()
    setRecipes(localRecipes);
  }, []) */

  function handleClick({ value }) {
    if (value === 'All') {
      setRecipes(simulation);
    }
    if (value === 'Food') {
      setRecipes(simulation.filter((recipe) => recipe.type === 'meal'));
    }
    if (value === 'Drinks') {
      setRecipes(simulation.filter((recipe) => recipe.type === 'drink'));
    }
  }

  function handleCopy(id, category) {
    if (category === 'meal') copy(`/foods/${id}/`);
    else copy(`/drinks/${id}`);

    const THREE = 3000;
    setIsVisible(true);
    setTimeout(() => { setIsVisible(false); }, THREE);
  }

  if (recipes.length === 0) return null;

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Done Recipes" />

      <button
        value="All"
        type="button"
        onClick={ ({ target }) => handleClick(target) }
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        value="Food"
        type="button"
        onClick={ ({ target }) => handleClick(target) }
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        value="Drinks"
        type="button"
        onClick={ ({ target }) => handleClick(target) }
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { recipes.map((recipe, index) => {
        const {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
          doneDate,
          tags,
        } = recipe;

        return (
          <section style={ { width: '400px', margin: '0 auto' } } key={ id }>
            <input
              type="image"
              src={ shareIcon }
              onClick={ () => handleCopy(id, category) }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
            />
            { isVisible && <p>Link copied!</p> }
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { type === 'meal' ? ` ${nationality} ${category}` : alcoholicOrNot }
            </p>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </p>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { doneDate }
            </p>
            <input
              type="image"
              src={ image }
              onClick={
                type === 'meal'
                  ? history.push(`/foods/${id}`)
                  : history.push(`/drinks/${id}`)
              }
              style={ { width: '100%' } }
              alt="share image btn"
              data-testid={ `${index}-horizontal-share-btn` }
            />
            { tags.map((tag, i) => (
              <span
                key={ i }
                data-testid={ `${i}-${tag}-horizontal-tag>` }
              >
                { tag }
              </span>
            )) }
          </section>
        );
      }) }

    </div>
  );
}

DoneRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

/* const mapStateToProps = (state) => ({

}); */

export default connect(/* mapStateToProps */null, null)(DoneRecipes);
