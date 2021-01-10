import { push } from 'connected-react-router';
import { all, put, call, takeEvery } from 'redux-saga/effects';
import { Routes } from '../common/enums/Routes';
import { clearStorage } from '../common/helpers/storageHelper';
import { IUser } from '../common/models/user/IUser';
import { fetchUserRoutine } from '../routines/user';
import { fetchUser } from '../services/authService';

function* fetchUserRequest() {
  try {
    const user: IUser = yield call(fetchUser);

    yield put(fetchUserRoutine.success(user));
  } catch (error) {
    yield call(clearStorage);
    yield put(push(Routes.Dashboard));
    yield put(fetchUserRoutine.failure());
  }
}

function* watchFetchUserRequest() {
  yield takeEvery(fetchUserRoutine.TRIGGER, fetchUserRequest);
}

export default function* userSaga() {
  yield all([
    watchFetchUserRequest()
  ]);
}
