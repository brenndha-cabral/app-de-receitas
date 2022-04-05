import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../pages/css/detailsOrProgress.css';
import { getStoragefavoritesRecipes } from '../../helpers/localStorage';
import favoritesFoodsRecipes from '../../helpers/localStorageFood';
import favoritesDrinksRecipes from '../../helpers/localStorageDrink';

function DetailsComponent(props) {
  const { foodDetails, drinkDetails, idRecipe } = props;
  const [changeHeart, setChangeHeart] = useState(false);

  const toggleHeart = () => {
    const getFavorites = getStoragefavoritesRecipes()
      .some(({ id }) => (
        id === idRecipe
      ));
    setChangeHeart(getFavorites);
  };

  useEffect(() => {
    toggleHeart();
  }, []);

  function favoriteRecipe(favorite) {
    const { strMeal } = foodDetails;
    const key = Object.keys(favorite);

    if (key.includes(strMeal)) {
      return favoritesFoodsRecipes(favorite);
    }
    return favoritesDrinksRecipes(favorite);
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
  } = foodDetails;

  const {
    strDrink,
    strDrinkThumb,
    strAlcoholic,
  } = drinkDetails;

  return (
    <div>

      <h1 data-testid="recipe-title">{ strMeal || strDrink }</h1>

      <img
        data-testid="recipe-photo"
        src={ strMealThumb || strDrinkThumb }
        alt="recipe-details"
      />

      <div>
        <button
          className="share-button"
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            navigator.clipboard.writeText((window.location.href)
              .replace('/in-progress', ''));
            toast('Link copied!');
          } }
        >
          <img
            src={ shareIcon }
            alt="Share recipe"
          />
        </button>
        {/* Sugestão do Tonn Turma XP/Tribo B | Referência biblioteca Toaster: https://react-hot-toast.com/  */}
        <Toaster />
      </div>

      <input
        className={ `favorite ${changeHeart && 'favorite--active'}` }
        data-testid="favorite-btn"
        src={ changeHeart ? blackHeartIcon : whiteHeartIcon }
        alt="Favorite recipe"
        type="image"
        onClick={ () => {
          favoriteRecipe(foodDetails !== {} || drinkDetails);
          toggleHeart();
        } }
      />

      <h2
        data-testid="recipe-category"
      >
        { strCategory || strAlcoholic }
      </h2>

    </div>
  );
}

DetailsComponent.propTypes = {
  foodDetails: PropTypes.objectOf(PropTypes.string),
  drinkDetails: PropTypes.objectOf(PropTypes.string),
  idRecipe: PropTypes.string.isRequired,
};

DetailsComponent.defaultProps = {
  foodDetails: {},
  drinkDetails: {},
};

export default DetailsComponent;
