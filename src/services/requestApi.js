export const requestIngredientFood = async (ingredient) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestNameFood = async (name) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestfirstLetterFood = async (firstLetter) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestIngredientDrink = async (ingredient) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestNameDrink = async (name) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const requestfirstLetterDrink = async (firstLetter) => {
  try {
    const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};
