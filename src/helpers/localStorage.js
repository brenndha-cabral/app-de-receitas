export function setStoragefavoritesRecipes(obj) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
}

export function getStoragefavoritesRecipes() {
  return (JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
}
