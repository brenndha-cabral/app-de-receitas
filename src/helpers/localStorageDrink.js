import { getStoragefavoritesRecipes, setStoragefavoritesRecipes } from './localStorage';

export default function favoritesDrinksRecipes(drinksDetails) {
  const { idDrink: id,
    strDrinkThumb: image,
    strArea: nationality,
    strDrink: name,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
  } = drinksDetails || {};

  let currentFavorites = getStoragefavoritesRecipes();

  const isFavorite = currentFavorites.some((element) => element.id === id);

  if (isFavorite) {
    currentFavorites = currentFavorites.filter((element) => element.id !== id);
  } else {
    const type = 'drink';
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
