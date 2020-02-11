import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_POST_IMAGE_REQUEST,
  LOAD_POST_IMAGE_FAILURE,
  LOAD_POST_IMAGE_SUCCESS
} from "../redux/actions/postAction";

function loadPostImageApi(loadPostImageData) {
  return axios.post("/post/loadPostImage", loadPostImageData, {
    withCredentials: true
  });
}

function* loadPostImage(action) {
  try {
    const result = yield call(loadPostImageApi, action.data);
    yield put({
      type: LOAD_POST_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POST_IMAGE_FAILURE
    });
  }
}

function* watchLoadPostImage() {
  yield takeLatest(LOAD_POST_IMAGE_REQUEST, loadPostImage);
}

export default function* postSaga() {
  yield all([fork(watchLoadPostImage)]);
}
