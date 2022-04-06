import { getStorageProgress,
  setStorageProgress } from './localStorage';

export function handleChangeFood(type, idFood, ingredients) {
  const getProgress = getStorageProgress() || { meals: {
    [idFood]: [],
  },
  cocktails: {} };

  if (type === 'button') {
    getProgress.meals[idFood] = [];
    setStorageProgress(getProgress);
  }

  if (type === 'localIngredients') {
    getProgress.meals[idFood] = ingredients;
    setStorageProgress(getProgress);
  }
}

export function handleChangeDrink(type, idDrink, ingredients) {
  const getProgress = getStorageProgress() || { cocktails: {
    [idDrink]: [],
  },
  meals: {} };

  if (type === 'button') {
    getProgress.cocktails[idDrink] = [];
    setStorageProgress(getProgress);
  }

  if (type === 'localIngredients') {
    getProgress.cocktails[idDrink] = ingredients;
    setStorageProgress(getProgress);
  }
}
