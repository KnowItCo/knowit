import React from 'react';
import { Route } from 'react-router';
import App from './common/containers/App';
import HomePage from './common/components/HomePage';
import Login from './common/components/Login';

export default (
  <Route path="/" component={HomePage}>
    <Route path="login" component={Login} />
    <Route path="profile" component={App} />
  </Route>
);
