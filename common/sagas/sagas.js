/*eslint-disable */

import { take, put, call, fork } from 'redux-saga';
import { history, api } from '../services';
import * as actions from './../actions/actions';

// action creators, each has 3 associated actions (REQUEST, SUCCESS, FAILURE)
const { learnable, loginUser } = actions;
// const { learnable } = actions;

/* Subroutines */

// resuable fetch Subroutine
// entity : learnable
// apiFn  : api.fetchlearnables
// id     : username

// calling action creators
function* fetchEntity(entity, apiFn, id) {
  const { response, error } = yield call(apiFn, id);
  if (!error) {
    yield put(entity.success(id, response));
  } else {
    yield put(entity.failure(id, error));
  }
}

const fetchLearnables = fetchEntity.bind(null, learnable, api.fetchLearnables);
const loginUserAsync = fetchEntity.bind(null, loginUser, api.loginUser);

function* loadLearnables(username) {
  yield call(fetchLearnables, username);
}

function* loadLoginUser(username) {
  yield call(loginUserAsync, username);
}

// Fetches data for a User: user learnables
function* watchLoadUserPage() {
  while (true) {
    const { username } = yield take(actions.LOGIN.REQUEST);
    // yield call(loadLoginUser, username);
    yield call(loadLearnables, username);
    yield put(actions.navigate('/profile'));
    yield history.push('/profile');
  }
}

// Fetches data for a User: user learnables
function* watchFailureLogin() {
  while (true) {
    const { username, error } = yield take(actions.LOGIN.FAILURE);
    yield put(actions.navigate('/profile'));
    yield history.push('/');
  }
}

// trigger router navigation via history
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
}

// https://github.com/yelouafi/redux-saga/issues/14
