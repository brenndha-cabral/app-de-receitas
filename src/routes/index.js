import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Recipes from '../pages/recipes/Recipes';
import Profile from '../pages/profile/Profile';
import Drinks from '../pages/drinks/Drinks';
import DetailsFoods from '../pages/detailsFoods/DetailsFoods';
import DetailsDrinks from '../pages/detailsDrinks/DetailsDrinks';
import ProgressFoods from '../pages/progressFoods/ProgressFoods';
import ProgressDrinks from '../pages/progressDrinks/ProgressDrinks';
import Explore from '../pages/explore/Explore';
import ExploreDrinksOrFoods from '../pages/exploreDrinksOrFoods/ExploreDrinksOrFoods';
import FoodsIngredients from '../pages/foodsIngredients/FoodsIngredients';
import DrinksIngredients from '../pages/drinksIngredients/DrinksIngredients';
import Nationalities from '../pages/nationalities/Nationalities';
import DoneRecipes from '../pages/doneRecipes/DoneRecipes';
import FavoritesRecipes from '../pages/favoritesRecipes/FavoritesRecipes';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Recipes } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ DetailsFoods } />
      <Route exact path="/drinks/:id" component={ DetailsDrinks } />
      <Route exact path="/foods/:id/in-progress" component={ ProgressFoods } />
      <Route exact path="/drink/:id/in-progress" component={ ProgressDrinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreDrinksOrFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinksOrFoods } />
      <Route exact path="/explore/foods/ingredients" component={ FoodsIngredients } />
      <Route exact path="/explore/drinks/ingredients" component={ DrinksIngredients } />
      <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default Routes;
