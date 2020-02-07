import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "../redux/actions/userAction";
import axios from "axios";

function signUpApi(signUpData) {
  return axios.post("/user/signUp", signUpData);
}

function* signUp(action) {
  try {
    const result = yield call(signUpApi, action.data);
    yield put({
      type: SIGN_UP_SUCCESS
      // data: result.data
    });
  } catch (error) {
    console.log(error.response.data);
    yield put({
      type: SIGN_UP_FAILURE,
      error: error.response.data
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga() {
  yield all([fork(watchSignUp)]);
}
