export function setStoragefavoritesRecipes(obj) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
}

export function getStoragefavoritesRecipes() {
  return (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
}

export function setStorageProgress(obj) {
  localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
}

export function getStorageProgress() {
  return (JSON.parse(localStorage.getItem('inProgressRecipes')));
