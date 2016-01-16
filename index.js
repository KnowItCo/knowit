// Babel polyfill must be imported before other packages
import 'babel-polyfill';
// React imports
import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

// App specific imports
import routes from './routes';
import history from './common/services/history';
import Root from './common/containers/Root';
import configureStore from './common/store/configureStore';

injectTapEventPlugin();

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
