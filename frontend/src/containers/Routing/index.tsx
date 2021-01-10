import React, { FunctionComponent } from 'react';

import { Route, Switch } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import Dashboard from '../../scenes/Dashboard/containers/Dashboard';
import Profile from '../../scenes/Profile/containers/Profile';
import Login from '../Login';
import PrivateRoute from '../PrivateRoute';

const Routing: FunctionComponent = () => (
  <Switch>
    <Route path={Routes.Login} component={Login} />
    <Route path={Routes.Dashboard} component={Dashboard} />
    <PrivateRoute path={Routes.Profile} component={Profile} />
  </Switch>
);

export default Routing;
