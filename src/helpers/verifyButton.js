import { getStorageProgress } from './localStorage';

const START_RECIPE = 'Start Recipe';
const CONTINUE_RECIPE = 'Continue Recipe';

export const verifyButtonFood = (idMeal) => {
  const startedRecipes = getStorageProgress();

  if (startedRecipes === null) {
    return START_RECIPE;
  }

  const keys = Object.keys(startedRecipes.meals).includes(idMeal);

  if (keys && startedRecipes.meals[idMeal].length > 0) {
    return CONTINUE_RECIPE;
  }
  return START_RECIPE;
};

export const verifyButtonDrink = (idDrink) => {
  const startedRecipes = getStorageProgress();

  if (startedRecipes === null) {
    return START_RECIPE;
  }

  const keys = Object.keys(startedRecipes.cocktails).includes(idDrink);

  if (keys && startedRecipes.cocktails[idDrink].length > 0) {
    return CONTINUE_RECIPE;
  }
  return START_RECIPE;
};
