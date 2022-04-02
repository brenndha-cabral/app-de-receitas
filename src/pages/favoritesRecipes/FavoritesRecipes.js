import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteRecipes(props) {
  const { history } = props;
  const [recipes, setRecipes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.title = 'All Tasty | Favorite Recipes';
  }, []);

  useEffect(() => {
    const localRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(localRecipes);
  }, []);

  function handleClick({ value }) {
    if (value === 'All') {
      setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
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
    const URL = href.replace('/favorite-recipes', '');

    if (category === 'food') copy(`${URL}/foods/${id}`);
    else copy(`${URL}/drinks/${id}`);

    const THREE = 3000;
    setIsVisible(true);
    setTimeout(() => { setIsVisible(false); }, THREE);
  }

  function handleDisfavorButton(id) {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = currentFavorites.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  }

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Favorite Recipes" />

      { isVisible && <p>Link copied!</p> }

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

      { recipes && recipes.map((recipe, index) => {
        const {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        } = recipe;

        const isFood = type === 'food';

        return (
          <section style={ { width: '400px', margin: '0 auto' } } key={ id }>

            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { isFood ? ` ${nationality} - ${category}` : alcoholicOrNot }
            </p>

            <button
              type="button"
              onClick={ () => history.push(`/foods/${id}`) }
              data-testid={ `${index}-horizontal-name` }
            >
              { name }
            </button>

            <input
              type="image"
              src={ shareIcon }
              onClick={ () => handleCopy(id, type) }
              data-testid={ `${index}-horizontal-share-btn` }
              alt="recipe"
            />

            <input
              type="image"
              onClick={ () => handleDisfavorButton(id) }
              src={ blackHeartIcon }
              data-testid={ `${index}-horizontal-favorite-btn` }
              alt="recipe"
            />

            <input
              type="image"
              src={ image }
              onClick={ isFood ? () => history.push(`/foods/${id}`)
                : () => history.push(`/drinks/${id}`) }
              style={ { width: '100%' } }
              alt="share image btn"
              data-testid={ `${index}-horizontal-image` }
            />
          </section>
        );
      }) }

    </div>
  );
}

FavoriteRecipes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.objectOf(PropTypes.string, PropTypes.object),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default FavoriteRecipes;
