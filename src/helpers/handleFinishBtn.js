export function handleFinishBtnFood(foodDetails) {
  const {
    idMeal,
    strArea,
    strTags,
    strCategory,
    strMeal,
    strMealThumb } = foodDetails;

  const newDoneRecipe = {
    id: idMeal,
    type: 'food',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: strTags.split(','),
  };

  const previousDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (previousDoneRecipes) {
    const newDoneRecipes = [...previousDoneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  }
}

export function handleFinishBtnDrink(drinksDetails) {
  const { idDrink,
    strDrinkThumb,
    strAlcoholic,
    strDrink,
  } = drinksDetails;

  const newDoneRecipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    doneDate: new Date().toLocaleDateString(),
    tags: [],
  };

  const previousDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  if (previousDoneRecipes) {
    const newDoneRecipes = [...previousDoneRecipes, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([newDoneRecipe]));
  }
}
