import * as ActionTypes from './../actions/actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities
// TODO: use with normalizr
function entities(state = { learnables: {} }, action) {
  if (action.response) {
    return merge({}, state, { learnables: action.response });
  }

  return state;
}

function router(state = { pathname: '/' }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ROUTER_STATE:
      return action.state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  entities,
  router,
});

export default rootReducer;
