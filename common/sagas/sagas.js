import { take, put, call, fork } from 'redux-saga';
import { api } from '../services';
import * as actions from './../actions/actions';

// action creators
const { learnable } = actions;

/* Subroutines */

// resuable fetch Subroutine
// entity : learnable
// apiFn  : api.fetchlearnables
// id     : username

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

const fetchLearnables = fetchEntity.bind(null, learnable, api.fetchLearnables);

// TODO: the API needs to updated to use username, obviously
function* loadLearnables(username) {
  yield call(fetchLearnables, username);
}

/* WATCHERS */

// Fetches data for a User : user learnables
function* watchLoadUserPage() {
  while (true) {
    const { username } = yield take(actions.LOAD_USER_PAGE);

    yield call(loadLearnables, username);
  }
}

export default function* root(getState) {
  const getLearnables = getState().entities.learnables;

  yield fork(watchLoadUserPage, getLearnables);
}
