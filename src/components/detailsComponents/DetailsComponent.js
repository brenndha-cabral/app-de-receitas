import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import '../../pages/css/detailsOrProgress.css';
import { getStoragefavoritesRecipes } from '../../helpers/localStorage';
import favoritesFoodsRecipes from '../../helpers/localStorageFood';

function DetailsComponent(props) {
  const { foodDetails, idRecipe } = props;
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

  const {
    strMeal,
    strMealThumb,
    strCategory,
  } = foodDetails;

  return (
    <div>

      <h1 data-testid="recipe-title">{ strMeal }</h1>

      <img
        data-testid="recipe-photo"
        src={ strMealThumb }
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
          favoritesFoodsRecipes(foodDetails);
          toggleHeart();
        } }
      />

      <h2
        data-testid="recipe-category"
      >
        { strCategory }
      </h2>

    </div>
  );
}

DetailsComponent.propTypes = {
  foodDetails: PropTypes.objectOf(PropTypes.string).isRequired,
  idRecipe: PropTypes.string.isRequired,
};

export default DetailsComponent;
