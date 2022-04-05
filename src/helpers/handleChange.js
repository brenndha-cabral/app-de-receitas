import { getStorageProgress,
  setStorageProgress } from './localStorage';

export function handleChangeFood(type, idFood, ingredients) {
  const getProgress = getStorageProgress() || { meals: {
    [idFood]: [],
  },
  cocktails: {} };

  console.log(ingredients);

  if (type === 'button') {
    getProgress.meals[idFood] = [];
    setStorageProgress(getProgress);
  }

  if (type === 'localIngredients') {
    getProgress.meals[idFood] = ingredients;
    setStorageProgress(getProgress);
  }
}

export function handleChangeDrink(event, idDrink) {
  const { checked, value, type } = event.target;

  const getProgress = getStorageProgress() || { cocktails: {
    [idDrink]: [],
  },
  meals: {} };

  if (type === 'button') {
    getProgress.cocktails[idDrink] = [];
    setStorageProgress(getProgress);
  }

  if (checked) {
    getProgress.cocktails[idDrink] = (getProgress.cocktails[idDrink])
      ? [...getProgress.cocktails[idDrink], value]
      : [value];
    setStorageProgress(getProgress);
  }
}
