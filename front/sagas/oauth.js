import { call, put, takeLatest, all, fork } from "redux-saga/effects";
import {
  KAKAO_SUCCESS,
  KAKAO_FAILURE,
  KAKAO_REQUEST
} from "../redux/actions/userAction";

function kakaoApi() {
  return axios.get("/auth/kakao");
}

function* kakao() {
  try {
    yield call(kakaoApi);
    yield put({
      type: KAKAO_SUCCESS
    });
  } catch (error) {
    yield put({
      type: KAKAO_FAILURE,
      error: error.response.data
    });
  }
}

function* watchKakao() {
  yield takeLatest(KAKAO_REQUEST, kakao);
}

export default function* oauthSaga() {
  yield all([fork(watchKakao)]);
}
