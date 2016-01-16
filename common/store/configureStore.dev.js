import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import saga from 'redux-saga';
import DevTools from './../containers/DevTools';
import rootReducer from './../reducers/reducers';
import rootSaga from './../sagas/sagas';

const finalCreateStore = compose(
  applyMiddleware(saga(rootSaga), createLogger()),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./../reducers/reducers', () => {
      const nextRootReducer = require('./../reducers/reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
