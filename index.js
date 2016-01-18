// Babel polyfill must be imported before other packages
import 'babel-polyfill';
// React imports
import React from 'react';
import { render } from 'react-dom';

// App specific imports
import routes from './routes';
import history from './common/services/history';
import Root from './common/containers/Root';
import configureStore from './common/store/configureStore';

const store = configureStore();

requestAnimationFrame(() =>
  render(
    <Root
      store={store}
      history={history}
      routes={routes}
    />,
    document.getElementById('root')
  )
);
