import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_OUT_REQUEST,
  LOG_OUT_FAILURE,
  LOG_OUT_SUCCESS
} from "../redux/actions/userAction";
import axios from "axios";

function logInApi(logInData) {
  return axios.post("/user/logIn", logInData, {
    withCredentials: true
  });
}

function* logIn(action) {
  try {
    const result = yield call(logInApi, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE
    });
  }
}

function* watchLogIn() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}

function signUpApi(signUpData) {
  return axios.post("/user/signUp", signUpData);
}

function* signUp(action) {
  try {
    yield call(signUpApi, action.data);
    yield put({
      type: SIGN_UP_SUCCESS
    });
    const result = yield call(logInApi, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE
    });
  }
}

function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}

function logOutApi() {
  return axios.post("/user/logOut", {}, { withCredentials: true });
}

function* logOut() {
  try {
    yield call(logOutApi);
    console.log("성공");
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOG_OUT_FAILURE,
      error: error.response.data
    });
  }
}

function* watchlogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}

export default function* userAuthSaga() {
  yield all([fork(watchSignUp), fork(watchLogIn), fork(watchlogOut)]);
}
