/*eslint-disable */

import { take, put, call, fork } from 'redux-saga';
import { history, api } from '../services';
import * as actions from './../actions/actions';

// action creators, each has 3 associated actions (REQUEST, SUCCESS, FAILURE)
const { getLearnables, loginUser, addLearnable, deleteLearnable, checkAuthUser } = actions;
// const { learnable } = actions;

/* Subroutines */

// Resuable fetch Subroutine for fetching entities (e.g. learnables)
// calling action creators
function* fetchEntity(entity, apiFn, id) {
  yield put(entity.request(id));
  const { response, error } = yield call(apiFn, id);
  if (!error) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

function* addLearnableSaga(entity, apiCall, email, learnable, tags) {
  const { confirmation, error } = yield call(apiCall, email, learnable, tags);
  if (!error) {
    yield put(entity.success(email, confirmation));
  } else {
    yield put(entity.failure(email, error));
  }
}

function* loginUserSaga(entity, apiCall, email) {
  const { confirmation, error } = yield call(apiCall, email);
  if (!error) {
    yield put(entity.success(email, confirmation));
  } else {
    yield put(entity.failure(email, error));
  }
}

function* checkAuthSaga(entity, apiCall) {
  const { confirmation, error } = yield call(apiCall);
  if (!error) {
    yield put(entity.success(confirmation));
  } else {
    yield put(entity.failure(error));
  }
}

function* deleteLearnableSaga(entity, apiCall, learnableid) {
  const { confirmation, error } = yield call(apiCall, learnableid);
  if (!error) {
    yield put(entity.success(learnableid, confirmation));
  } else {
    yield put(entity.failure(learnableid, error));
  }
}

const fetchLearnables = fetchEntity.bind(null, getLearnables, api.fetchLearnables);
const loginUserAsync = loginUserSaga.bind(null, loginUser, api.loginUser);
const checkAuthAsync = checkAuthSaga.bind(null, checkAuthUser, api.checkAuth);
const addLearnableAsync = addLearnableSaga.bind(null, addLearnable, api.addLearnable);
const deleteLearnableAsync = deleteLearnableSaga.bind(null, deleteLearnable, api.deleteLearnable);

function* loadLearnables(username) {
  yield call(fetchLearnables, username);
}

function* loadLoginUser(email) {
  yield call(loginUserAsync, email);
}

function* loadcheckAuth() {
  yield call(checkAuthAsync);
}

function* loadAddLearnable(email, learnable, tags) {
  yield call(addLearnableAsync, email, learnable, tags);
}

function* loadDeleteLearnable(learnableid) {
  yield call(deleteLearnableAsync, learnableid);
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

// Fetches login and learnables for a User
function* watchCheckAuthRequest() {
  while (true) {
    yield take(actions.AUTH_CHECK.REQUEST);
    yield call(loadcheckAuth);
    yield call(loadLearnables, 'iam.preethi.k@gmail.com'); // TODO
    yield put(actions.navigate('/profile/iam.preethi.k@gmail.com'));
    yield history.push('/profile/iam.preethi.k@gmail.com');
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

// Deletes a learnable for a User
function* watchdeleteLearnable() {
  while (true) {
    const { learnableid, email } = yield take(actions.DELETE_LEARNABLE.REQUEST);
    yield call(loadDeleteLearnable, learnableid);
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
  yield fork(watchdeleteLearnable, getLearnables);
  yield fork(watchCheckAuthRequest, getLearnables);
}

// https://github.com/yelouafi/redux-saga/issues/14
