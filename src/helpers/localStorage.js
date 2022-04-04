export function setStoragefavoritesRecipes(obj) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
}

export function getStoragefavoritesRecipes() {
  return (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
}

export function setStorageRecipes(obj) {
  localStorage.setItem('Recipes', JSON.stringify(obj));
}

export function getStorageRecipes() {
  const previousStorageRecipes = JSON.parse(localStorage.getItem('Recipes'));
  if (previousStorageRecipes) {
    return (JSON.parse(localStorage.getItem('Recipes')));
  }
}
