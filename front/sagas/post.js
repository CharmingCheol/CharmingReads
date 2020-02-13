import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";

import {
  LOAD_POST_IMAGE_REQUEST,
  LOAD_POST_IMAGE_FAILURE,
  LOAD_POST_IMAGE_SUCCESS,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  LOAD_POSTS_FAILURE,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_REQUEST
} from "../redux/actions/postAction";

//이미지 불러오기
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

//게시글 추가
function postApi(postData) {
  return axios.post("/post/addPost", postData, {
    withCredentials: true
  });
}

function* post(action) {
  try {
    console.log("dhsdlhsdoi");
    const result = yield call(postApi, action.data);
    console.log(result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE
    });
  }
}

function* watchPost() {
  yield takeLatest(ADD_POST_REQUEST, post);
}

//게시글 불러오기
function loadPostsApi() {
  return axios.get("/post/loadPosts?limit=10", {
    withCredentials: true
  });
}

function* loadposts() {
  try {
    const result = yield call(loadPostsApi);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE
    });
  }
}

function* watchloadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadposts);
}

export default function* postSaga() {
  yield all([fork(watchLoadPostImage), fork(watchPost), fork(watchloadPosts)]);
}