import { getStorageProgress,
  setStorageProgress } from './localStorage';

export function handleChangeFood(event, idFood) {
  const { checked, value, type } = event.target;

  if (type === 'button') {
    const getProgress = getStorageProgress() || { meals: {
      [idFood]: [],
    },
    cocktails: {} };

    const includes = getProgress.meals[idFood];
  }

  if (checked) {
    const getProgress = getStorageProgress() || { meals: {
      [idFood]: [],
    },
    cocktails: {} };

    getProgress.meals[idFood] = (getProgress.meals[idFood])
      ? [...getProgress.meals[idFood], value]
      : [value];
    setStorageProgress(getProgress);
  }
}

export function handleChangeDrink(event, idDrink) {
  const { checked, value } = event.target;

  if (checked) {
    const getProgress = getStorageProgress() || { cocktails: {
      [idDrink]: [],
    },
    meals: {} };

    getProgress.cocktails[idDrink] = (getProgress.cocktails[idDrink])
      ? [...getProgress.cocktails[idDrink], value]
      : [value];
    setStorageProgress(getProgress);
  }
}
