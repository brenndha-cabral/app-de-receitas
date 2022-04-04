export function ingredientFilter(drinksOrFoodDetails) {
  return Object.entries(drinksOrFoodDetails[0]).filter((element) => (
    element[0].includes('Ingredient')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);
}

export function measureFilter(drinksOrFoodDetails) {
  return Object.entries(drinksOrFoodDetails[0]).filter((element) => (
    element[0].includes('Measure')
  )).filter((element) => (element[1] !== ' ' && element[1] !== '' && element[1] !== null))
    .map((element) => element[1]);
}
