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

export const USER = createRequestType('USER');
export const LEARNABLE = createRequestType('LEARNABLE');

export const LOAD_USER_PAGE = 'LOAD_USER_PAGE';
export const UPDATE_ROUTER_STATE = 'UPDATE_ROUTER_STATE';
export const NAVIGATE = 'NAVIGATE';

// Return action with payload. Payload defaults to empty object if
// none passed in
function action(type, payload = {}) {
  return { type, payload }; // TODO: add spread, check eslint
}


export const user = {
  request: login => action(USER.REQUEST, { login }),
  success: (login, response) => action(USER.SUCCESS, { login, response }),
  failure: (login, error) => action(USER.FAILURE, { login, error }),
};

export const learnable = {
  request: username => action(LEARNABLE.REQUEST, { username }),
  success: (username, response) => action(LEARNABLE.SUCCESS, { username, response }),
  failure: (username, error) => action(LEARNABLE.FAILURE, { username, error }),
};

export const updateRouterState = state => action(UPDATE_ROUTER_STATE, { state });
export const navigate = pathname => action(NAVIGATE, { pathname });
export const loadUserPage = (username) => action(LOAD_USER_PAGE, { username });
