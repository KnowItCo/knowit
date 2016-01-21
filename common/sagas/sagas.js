/*eslint-disable */

import { take, put, call, fork } from 'redux-saga';
import { history, api } from '../services';
import * as actions from './../actions/actions';

// action creators, each has 3 associated actions (REQUEST, SUCCESS, FAILURE)
const { getLearnables, loginUser, addLearnable } = actions;
// const { learnable } = actions;

/* Subroutines */

// resuable fetch Subroutine
// entity : learnable
// apiFn  : api.fetchlearnables
// id     : email

// calling action creators
function* fetchEntity(entity, apiFn, id) {
  const { response, error } = yield call(apiFn, id);
  if (!error) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

function* addLearnableSaga(entity, apiCall, email, learnable, tags) {
  const { response, error } = yield call(apiCall, email, learnable, tags);
  if (!error) {
    yield put(entity.success(email, response));
  } else {
    yield put(entity.failure(email, error));
  }
}

const fetchLearnables = fetchEntity.bind(null, getLearnables, api.fetchLearnables);
const loginUserAsync = fetchEntity.bind(null, loginUser, api.loginUser);
const addLearnableAsync = addLearnableSaga.bind(null, addLearnable, api.addLearnable);

function* loadLearnables(username) {
  yield call(fetchLearnables, username);
}

function* loadLoginUser(email) {
  yield call(loginUserAsync, email);
}

function* loadAddLearnable(email, learnable, tags) {
  yield call(addLearnableAsync, email, learnable, tags);
}

// Fetches login and learnables for a User
function* watchLoadUserPage() {
  while (true) {
    const { email } = yield take(actions.LOGIN.REQUEST);
    yield call(loadLoginUser, email);
    yield call(loadLearnables, email);
    yield put(actions.navigate(`/profile/${email}`));
    yield history.push(`/profile/${email}`);
  }
}

// Adds a new learnable for a User
function* watchaddLearnable() {
  while (true) {
    const { email, learnable, tags } = yield take(actions.ADD_LEARNABLE.REQUEST);
    yield call(loadAddLearnable, email, learnable, tags);
    yield call(loadLearnables, email);
  }
}

// Watches for failed login, Redirect to landing page
function* watchFailureLogin() {
  while (true) {
    const { username, error } = yield take(actions.LOGIN.FAILURE);
    yield put(actions.navigate('/'));
    yield history.push('/');
  }
}

// Trigger router navigation via history
function* watchNavigate() {
  while (true) {
    const { pathname } = yield take(actions.NAVIGATE);
    yield history.push(pathname);
  }
}

export default function* root(getState) {
  const getLearnables = getState().entities.learnables;

  yield fork(watchNavigate);
  yield fork(watchFailureLogin);
  yield fork(watchLoadUserPage, getLearnables);
  yield fork(watchaddLearnable, getLearnables);
}

// https://github.com/yelouafi/redux-saga/issues/14
