import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Foods from '../pages/foods/Foods';
import Profile from '../pages/profile/Profile';
import Drinks from '../pages/drinks/Drinks';
import DetailsOrProgressFoods
from '../pages/detailsOrProgressFoods/DetailsOrProgressFoods';
import DetailsOrProgressDrinks
from '../pages/detailsOrProgressDrinks/DetailsOrProgressDrinks';
import Explore from '../pages/explore/Explore';
import ExploreDrinksOrFoods from '../pages/exploreDrinksOrFoods/ExploreDrinksOrFoods';
import Ingredients from '../pages/ingredients/Ingredients';
import Nationalities from '../pages/nationalities/Nationalities';
import DoneRecipes from '../pages/doneRecipes/DoneRecipes';
import FavoritesRecipes from '../pages/favoritesRecipes/FavoritesRecipes';
import NotFound from '../pages/notFound/NotFound';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/foods" component={ Foods } />
      <Route exact path="/drinks" component={ Drinks } />
      <Route exact path="/foods/:id" component={ DetailsOrProgressFoods } />
      <Route exact path="/drinks/:id" component={ DetailsOrProgressDrinks } />
      <Route exact path="/foods/:id/in-progress" component={ DetailsOrProgressFoods } />
      <Route exact path="/drinks/:id/in-progress" component={ DetailsOrProgressDrinks } />
      <Route exact path="/explore" component={ Explore } />
      <Route exact path="/explore/foods" component={ ExploreDrinksOrFoods } />
      <Route exact path="/explore/drinks" component={ ExploreDrinksOrFoods } />
      <Route exact path="/explore/foods/ingredients" component={ Ingredients } />
      <Route exact path="/explore/drinks/ingredients" component={ Ingredients } />
      <Route exact path="/explore/foods/nationalities" component={ Nationalities } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      <Route exact path="/explore/drinks/nationalities" component={ NotFound } />
    </Switch>
  );
}

export default Routes;
