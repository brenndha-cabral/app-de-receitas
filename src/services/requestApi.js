const requestRecipes = async () => {
  try {
    // const URL = '';
    const response = await fetch(URL);
    const dataBase = await response.json();

    return dataBase;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default requestRecipes;

// Outras requisições ficam neste mesmo arquivo, somente mudar o export default da primeira api
