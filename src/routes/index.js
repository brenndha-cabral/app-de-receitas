import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Foods from '../pages/recipes/Foods';
import Drinks from '../pages/recipes/Drinks';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks" component={ Drinks } />
    </Switch>
  );
}

export default Routes;
