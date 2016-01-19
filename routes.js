import React from 'react';
import { Route } from 'react-router';
import App from './common/containers/App';
import Profile from './common/containers/Profile';

export default (
  <Route path="/" component={App}>
    <Route path="profile" component={Profile} />
  </Route>
);
