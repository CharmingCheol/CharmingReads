import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../redux/actions/userAction";

function* signUp(action) {
  try {
    const result = ["data"];
    yield put({
      type: SIGN_UP_SUCCESS,
      data: result
    });
  } catch (error) {
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp)]);
}
