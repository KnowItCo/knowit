import merge from 'lodash/merge';

// Define the 3 types of requests
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

// Helper function to create different request types
// associated with different resources
function createRequestType(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export const GET_LEARNABLES = createRequestType('GET_LEARNABLES');
export const ADD_LEARNABLE = createRequestType('ADD_LEARNABLE');
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';
export const DELETE_LEARNABLE = createRequestType('DELETE_LEARNABLE');
export const AUTH_CHECK = createRequestType('AUTH_CHECK');
export const GENERATE_Q = createRequestType('GENERATE_Q');
export const CHANGE_TAG = 'CHANGE_TAG';
export const SIGN_OUT = createRequestType('SIGN_OUT');

// Return action with payload. Payload defaults to empty object if
// none passed in
function action(type, payload = {}) {
  return merge({}, { type }, payload);
}

export const generateQ = {
  request: (learnableid, learnableText) => action(GENERATE_Q.REQUEST, { learnableid, learnableText }),
  success: (confirmation) => action(GENERATE_Q.SUCCESS, { confirmation }),
  failure: (error) => action(GENERATE_Q.FAILURE, { error }),
};

export const checkAuthUser = {
  request: () => action(AUTH_CHECK.REQUEST, { }),
  success: (confirmation) => action(AUTH_CHECK.SUCCESS, { confirmation }),
  failure: (error) => action(AUTH_CHECK.FAILURE, { error }),
};

export const signOut = {
  request: () => action(SIGN_OUT.REQUEST, { }),
  success: (confirmation) => action(SIGN_OUT.SUCCESS, { confirmation }),
  failure: (error) => action(SIGN_OUT.FAILURE, { error }),
};

export const getLearnables = {
  request: () => action(GET_LEARNABLES.REQUEST, { }),
  success: (response) => action(GET_LEARNABLES.SUCCESS, { response }),
  failure: (error) => action(GET_LEARNABLES.FAILURE, { error }),
};

export const addLearnable = {
  request: (learnable, tags) => action(ADD_LEARNABLE.REQUEST, { learnable, tags }),
  success: (confirmation) => action(ADD_LEARNABLE.SUCCESS, { confirmation }),
  failure: (error) => action(ADD_LEARNABLE.FAILURE, { error }),
};

export const deleteLearnable = {
  request: (learnableid) => action(DELETE_LEARNABLE.REQUEST, { learnableid }),
  success: (learnableid, confirmation) => action(DELETE_LEARNABLE.SUCCESS, { learnableid, confirmation }),
  failure: (learnableid, error) => action(DELETE_LEARNABLE.FAILURE, { learnableid, error }),
};

export const updateRouterState = state => action(UPDATE_ROUTER_STATE, { state });

export const changeTag = tag => action(CHANGE_TAG, { tag });
