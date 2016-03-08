import React from 'react';
import { Route } from 'react-router';
import App from './common/containers/App';
import Profile from './common/containers/Profile';
import Generate from './common/containers/Generate';

export default (
  <Route path="/" component={App}>
    <Route path="profile" component={Profile} />
    <Route path="generate/:learnableid" component={Generate} />
  </Route>
);
