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

export const LOGIN = createRequestType('LOGIN');
export const GET_LEARNABLES = createRequestType('GET_LEARNABLES');
export const ADD_LEARNABLE = createRequestType('ADD_LEARNABLE');
export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';

// Return action with payload. Payload defaults to empty object if
// none passed in
function action(type, payload = {}) {
  return merge({}, { type }, payload);
}


export const loginUser = {
  request: (email) => action(LOGIN.REQUEST, { email }),
  success: (email, response) => action(LOGIN.SUCCESS, { email, response }),
  failure: (email, error) => action(LOGIN.FAILURE, { email, error }),
};

export const getLearnables = {
  request: email => action(GET_LEARNABLES.REQUEST, { email }),
  success: (email, response) => action(GET_LEARNABLES.SUCCESS, { email, response }),
  failure: (email, error) => action(GET_LEARNABLES.FAILURE, { email, error }),
};

export const addLearnable = {
  request: (email, learnable, tags) => action(ADD_LEARNABLE.REQUEST, { email, learnable, tags }),
  success: (email, response) => action(ADD_LEARNABLE.SUCCESS, { email, response }),
  failure: (email, error) => action(ADD_LEARNABLE.FAILURE, { email, error }),
};

export const updateRouterState = state => action(UPDATE_ROUTER_STATE, { state });
export const navigate = pathname => action(NAVIGATE, { pathname });
export const loadUserPage = username => action(LOAD_USER_PAGE, { username });

// export const loginUserRequest = username => action(LOGIN.REQUEST, { username });
// export const loginUserSuccess = (username, response) => action(LOGIN.SUCCESS, { username, response });
// export const loginUserFailure = (username, error) => action(LOGIN.FAILURE, { username, error });
