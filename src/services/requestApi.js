const requestRecipes = async () => {
  try {
    const URL = '';
    const response = await fetch(URL);
    const dataBase = await response.json();
    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default requestRecipes;

// Outras requisições ficam neste mesmo arquivo, somente mudar o export default da primeira api

export const foodsRecipes = async () => {
  const URL_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = response.json();
  return data;
};

export const drinksRecipes = async () => {
  const URL_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const response = await fetch(URL_API);
  const data = response.json();
  return data;
};
