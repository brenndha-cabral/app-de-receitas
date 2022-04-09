import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import toast, { Toaster } from 'react-hot-toast';
import Header from '../../components/header/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../css/favoriteRecipes.css';

function FavoriteRecipes(props) {
  const { history } = props;
  const [recipes, setRecipes] = useState([]);

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
  }

  function handleDisfavorButton(id) {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorites = currentFavorites.filter((favorite) => favorite.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setRecipes(newFavorites);
  }

  return (
    <div>
      <Header searchButtonIsVisible={ false } title="Favorite Recipes" />

      <div className="container-favorite-bottons">
        <button
          className="favorite-buttons"
          value="All"
          type="button"
          onClick={ ({ target }) => handleClick(target) }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          className="favorite-buttons"
          value="Food"
          type="button"
          onClick={ ({ target }) => handleClick(target) }
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          className="favorite-buttons"
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
        } = recipe;

        const isFood = type === 'food';

        return (
          <section key={ id } className="card-favorites-container">
            <div className="info-favorites-container">
              <Toaster />

              <div className="info-favorites-sub-container">
                <p
                  className="recipe-favorite-subtitle"
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { isFood ? ` ${nationality} - ${category}` : alcoholicOrNot }
                </p>

                <button
                  className="recipe-favorite-title-btn"
                  type="button"
                  onClick={ isFood ? () => history.push(`/foods/${id}`)
                    : () => history.push(`/drinks/${id}`) }
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }
                </button>
              </div>

              <div className="icons-container">
                <input
                  className="favorite-share-icon"
                  type="image"
                  src={ shareIcon }
                  onClick={ () => {
                    handleCopy(id, type);
                    toast('Link copied!');
                  } }
                  data-testid={ `${index}-horizontal-share-btn` }
                  alt="recipe"
                />

                <input
                  className="favorite-heart"
                  type="image"
                  onClick={ () => handleDisfavorButton(id) }
                  src={ blackHeartIcon }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  alt="recipe"
                />
              </div>

            </div>
            <input
              className="favorite-recipe-image"
              type="image"
              src={ image }
              onClick={ isFood ? () => history.push(`/foods/${id}`)
                : () => history.push(`/drinks/${id}`) }
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
