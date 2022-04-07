import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import copy from 'clipboard-copy';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';
import '../css/doneRecipes.css';

function DoneRecipes(props) {
  const { history } = props;
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    document.title = 'All Tasty | Done Recipes';
  }, []);

  useEffect(() => {
    const localRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(localRecipes);
  }, []);

  function handleClick({ value }) {
    if (value === 'All') {
      setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
    }
    if (value === 'Food') {
      setRecipes(recipes.filter((recipe) => recipe.type === 'food'));
    }
    if (value === 'Drinks') {
      setRecipes(recipes.filter((recipe) => recipe.type === 'drink'));
    }
  }

  function handleCopy(id, category) {
    const { location: { href } } = window;
    const URL = href.replace('/done-recipes', '');

    if (category === 'food') copy(`${URL}/foods/${id}`);
    else copy(`${URL}/drinks/${id}`);
  }

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Done Recipes" />

      <div className="container-done-bottons">
        <button
          className="done-buttons"
          value="All"
          type="button"
          onClick={ ({ target }) => handleClick(target) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="done-buttons"
          value="Food"
          type="button"
          onClick={ ({ target }) => handleClick(target) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="done-buttons"
          value="Drinks"
          type="button"
          onClick={ ({ target }) => handleClick(target) }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      { recipes && recipes.map((recipe, index) => {
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

        if (type === 'food') {
          return (
            <section className="container-card-done-recipe" key={ id }>
              <div className="card-done-recipe">
                <input
                  className="search-input"
                  type="image"
                  src={ shareIcon }
                  onClick={ () => {
                    handleCopy(id, type);
                    toast('Link copied!');
                  } }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="recipe"
                />
                <Toaster />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { ` ${nationality} - ${category}` }
                </p>
                <button
                  type="button"
                  onClick={ () => history.push(`/foods/${id}`) }
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </button>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `Done in: ${doneDate}` }
                </p>
                { tags.map((tag) => (
                  <p
                    key={ index }
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                  >
                    { tag }
                  </p>
                )) }
              </div>
              <div className="card-done-image">
                <input
                  type="image"
                  src={ image }
                  onClick={ () => history.push(`/foods/${id}`) }
                  alt="share image btn"
                  data-testid={ `${index}-horizontal-image` }
                />
              </div>
            </section>
          );
        }

        return (
          <section className="container-card-done-recipe" key={ id }>
            <div className="card-done-recipe">
              <input
                type="image"
                src={ shareIcon }
                onClick={ () => {
                  handleCopy(id, type);
                  toast('Link copied!');
                } }
                data-testid={ `${index}-horizontal-share-btn` }
                alt="recipe"
              />
              <Toaster />
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { alcoholicOrNot }
              </p>
              <button
                type="button"
                onClick={ () => history.push(`/drinks/${id}`) }
                data-testid={ `${index}-horizontal-name` }
              >
                { name }
              </button>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                { `Done in: ${doneDate}` }
              </p>
              <input
                type="image"
                src={ image }
                onClick={ () => history.push(`/drinks/${id}`) }
                style={ { width: '100%' } }
                alt="share image btn"
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
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

export default DoneRecipes;
