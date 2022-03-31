export const requestIngredientFood = async (ingredient) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    return (meals || []);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestNameFood = async (name) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    return (meals || []);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestfirstLetterFood = async (firstLetter) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    return (meals || []);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestIngredientDrink = async (ingredient) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    return (drinks || []);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestNameDrink = async (name) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    return (drinks || []);
  } catch (error) {
    throw new Error(error.message);
  }
};
// Outras requisições ficam neste mesmo arquivo, somente mudar o export default da primeira api

export const foodsRecipes = async () => {
  const URL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const drinksRecipes = async () => {
  const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const requestfirstLetterDrink = async (firstLetter) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(URL);
    const { drinks } = await response.json();
    return (drinks || []);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestRandomFoodDetails = async () => {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const { meals } = await response.json();
    return meals[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestRandomDrinkDetails = async () => {
  try {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(URL);
    const { drinks } = await response.json();
    return drinks[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const buttonsCategoriesFoods = async () => {
  const URL_API = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const buttonsCategoriesDrinks = async () => {
  const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const requestFilterByCategoryFood = async (category) => {
  const URL_API = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const requestFilterByCategoryDrinks = async (category) => {
  const URL_API = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const requestAllFoodsIngredients = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const { meals } = await response.json();
  return meals;
};

export const requestAllDrinksIngredients = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
  const response = await fetch(URL);
  const { drinks } = await response.json();
  return drinks;
};

export const requestArea = async () => {
  try {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error.mesage);
  }
};

export const requestRecipesByArea = async (area) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    const response = await fetch(URL);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    throw new Error(error.mesage);
  }
};
