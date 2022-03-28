import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default Routes;
