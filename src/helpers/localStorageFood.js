import { getStoragefavoritesRecipes, setStoragefavoritesRecipes } from './localStorage';

export default function favoritesFoodsRecipes(foodDetails) {
  const { idMeal: id,
    strMealThumb: image,
    strArea: nationality,
    strMeal: name,
    strCategory: category,
  } = foodDetails || {};

  let currentFavorites = getStoragefavoritesRecipes();

  const isFavorite = currentFavorites.some((element) => element.id === id);

  if (isFavorite) {
    currentFavorites = currentFavorites.filter((element) => element.id !== id);
  } else {
    const type = 'food';
    const alcoholicOrNot = '';
    const obj = { id,
      type,
      nationality: nationality !== undefined ? nationality : '',
      category,
      alcoholicOrNot,
      name,
      image };
    currentFavorites.push(obj);
  }
  setStoragefavoritesRecipes(currentFavorites);
}
