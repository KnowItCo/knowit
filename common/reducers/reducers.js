import * as ActionTypes from './../actions/actions';
import merge from 'lodash/merge';
import { groupByTags } from './../../utils/helpers';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities
// TODO: use with normalizr

function login(state = { email: null, isLoggingIn: false, isLoggedIn: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.LOGIN.REQUEST:
      return merge({}, state, {
        isLoggingIn: true,
        isLoggedIn: false,
        email: action.email,
      });
    case ActionTypes.LOGIN.SUCCESS:
      return merge({}, state, {
        error: null,
        isLoggingIn: false,
        isLoggedIn: true,
        email: action.email,
      });
    case ActionTypes.LOGIN.FAILURE:
      return merge({}, state, {
        error: action.error,
        isLoggingIn: false,
        isLoggedIn: false,
        email: null,
      });
    default:
      return state;
  }
}

function addLearnable(state = { email: null, learnableBeingAdded: false, learnableAdded: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.ADD_LEARNABLE.REQUEST:
      return merge({}, state, {
        learnableBeingAdded: true,
        email: action.email,
        learnable: action.learnable,
        tags: action.tags,
      });
    case ActionTypes.ADD_LEARNABLE.SUCCESS:
      return merge({}, state, {
        learnableBeingAdded: false,
        learnableAdded: true,
        learnable: action.learnable,
        tags: action.tags,
      });
    case ActionTypes.ADD_LEARNABLE.FAILURE:
      return merge({}, state, {
        learnableBeingAdded: false,
        learnableAdded: false,
        error: action.error,
      });
    default:
      return state;
  }
}

function deleteLearnable(state = { learnableBeingDeleted: false, learnableDeleted: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.DELETE_LEARNABLE.REQUEST:
      return merge({}, state, {
        learnableBeingDeleted: true,
        learnableDeleted: false,
      });
    case ActionTypes.ADD_LEARNABLE.SUCCESS:
      return merge({}, state, {
        learnableBeingDeleted: false,
        learnableDeleted: true,
      });
    case ActionTypes.ADD_LEARNABLE.FAILURE:
      return merge({}, state, {
        learnableBeingDeleted: false,
        learnableDeleted: false,
        error: action.error,
      });
    default:
      return state;
  }
}

function fetchLearnables(state = { email: null, learnables: [], fetchingLearnables: false, fetchedLearnables: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.GET_LEARNABLES.REQUEST:
      return merge({}, state, {
        email: action.email,
        fetchingLearnables: true,
        fetchedLearnables: false,
      });
    case ActionTypes.GET_LEARNABLES.SUCCESS:
      return merge({}, state, {
        fetchingLearnables: false,
        fetchedLearnables: true,
        learnables: action.response.data,
      });
    case ActionTypes.GET_LEARNABLES.FAILURE:
      return merge({}, state, {
        fetchingLearnables: false,
        fetchedLearnables: false,
        error: action.error,
      });
    default:
      return state;
  }
}

function entities(state = { learnables: {}, tags: [] }, action) {
  if (action.response) {
    const tagsGrouped = groupByTags(action.response.data, 'tags');
    return merge({}, state, { learnables: action.response.data, tags: tagsGrouped });
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
  login,
  addLearnable,
  fetchLearnables,
  deleteLearnable,
  router,
  entities,
});

export default rootReducer;
