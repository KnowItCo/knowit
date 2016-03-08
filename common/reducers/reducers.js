import * as ActionTypes from './../actions/actions';
import merge from 'lodash/merge';
import { groupByTags } from './../../utils/helpers';
import { combineReducers } from 'redux';

// Updates an entity cache in response to any action with response.entities
// TODO: use with normalizr

function login(state = { isLoggedIn: false, error: null, email: null }, action) {
  switch (action.type) {
    case ActionTypes.AUTH_CHECK.REQUEST:
      return merge({}, state, {
        isLoggedIn: false,
        email: null,
      });
    case ActionTypes.AUTH_CHECK.SUCCESS:
      return merge({}, state, {
        error: null,
        isLoggedIn: true,
        email: action.confirmation.data.email,
      });
    case ActionTypes.AUTH_CHECK.FAILURE:
      return merge({}, state, {
        error: action.error,
        isLoggedIn: false,
      });
    default:
      return state;
  }
}


function addLearnable(state = { learnableBeingAdded: false, learnableAdded: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.ADD_LEARNABLE.REQUEST:
      return merge({}, state, {
        learnableBeingAdded: true,
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

function fetchLearnables(state = { learnables: [], fetchingLearnables: false, fetchedLearnables: false, error: null }, action) {
  switch (action.type) {
    case ActionTypes.GET_LEARNABLES.REQUEST:
      return merge({}, state, {
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

function generateQs(state = { questions: [], generatingQuestions: false, generatedQuestions: false, error: null }, action) {
  console.log(action, 'sdfjsdkjf');
  switch (action.type) {
    case ActionTypes.GENERATE_Q.REQUEST:
      return merge({}, state, {
        generatingQuestions: true,
        generatedQuestions: false,
      });
    case ActionTypes.GENERATE_Q.SUCCESS:
      return merge({}, state, {
        generatingQuestions: false,
        generatedQuestions: true,
        questions: action.confirmation.data.data,
      });
    case ActionTypes.GENERATE_Q.FAILURE:
      return merge({}, state, {
        generatingQuestions: false,
        generatedQuestions: false,
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
  generateQs,
  router,
  entities,
});

export default rootReducer;
