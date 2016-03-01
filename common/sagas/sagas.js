/*eslint-disable */

import { take, put, call, fork } from 'redux-saga';
import { history, api } from '../services';
import * as actions from './../actions/actions';

// action creators, each has 3 associated actions (REQUEST, SUCCESS, FAILURE)
const { getLearnables, addLearnable, deleteLearnable, checkAuthUser } = actions;
// const { learnable } = actions;

/* Subroutines */

// Resuable fetch Subroutine for fetching entities (e.g. learnables)
// calling action creators
function* fetchEntity(entity, apiFn) {
  yield put(entity.request());
  const { response, error } = yield call(apiFn);
  if (!error) {
    yield put(entity.success(response));
  } else {
    yield put(entity.failure(error));
  }
}

function* addLearnableSaga(entity, apiCall, learnable, tags) {
  const { confirmation, error } = yield call(apiCall, learnable, tags);
  if (!error) {
    yield put(entity.success(confirmation));
  } else {
    yield put(entity.failure(error));
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
const checkAuthAsync = checkAuthSaga.bind(null, checkAuthUser, api.checkAuth);
const addLearnableAsync = addLearnableSaga.bind(null, addLearnable, api.addLearnable);
const deleteLearnableAsync = deleteLearnableSaga.bind(null, deleteLearnable, api.deleteLearnable);

function* loadLearnables() {
  yield call(fetchLearnables);
}

function* loadcheckAuth() {
  yield call(checkAuthAsync);
}

function* loadAddLearnable(learnable, tags) {
  yield call(addLearnableAsync, learnable, tags);
}

function* loadDeleteLearnable(learnableid) {
  yield call(deleteLearnableAsync, learnableid);
}

// Fetches login and learnables for a User
function* watchCheckAuthRequest() {
  while (true) {
    yield take(actions.AUTH_CHECK.REQUEST);
    yield call(loadcheckAuth);
  }
}

// Fetches login and learnables for a User
function* watchCheckAuthSuccess() {
  while (true) {
    const { confirmation } = yield take(actions.AUTH_CHECK.SUCCESS);
    yield call(loadLearnables); // TODO
    yield put(actions.navigate('/profile'));
    yield history.push('/profile');
  }
}

// Adds a new learnable for a User
function* watchaddLearnable() {
  while (true) {
    const { learnable, tags } = yield take(actions.ADD_LEARNABLE.REQUEST);
    yield call(loadAddLearnable, learnable, tags);
    yield call(loadLearnables);
  }
}

// Deletes a learnable for a User
function* watchdeleteLearnable() {
  while (true) {
    const { learnableid } = yield take(actions.DELETE_LEARNABLE.REQUEST);
    yield call(loadDeleteLearnable, learnableid);
    yield call(loadLearnables);
  }
}


// Watches for failed login, Redirect to landing page
function* watchFailureLogin() {
  while (true) {
    const { username, error } = yield take(actions.AUTH_CHECK.FAILURE);
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
  yield fork(watchaddLearnable, getLearnables);
  yield fork(watchdeleteLearnable, getLearnables);
  yield fork(watchCheckAuthRequest);
  yield fork(watchCheckAuthSuccess, getLearnables);
}

// https://github.com/yelouafi/redux-saga/issues/14
