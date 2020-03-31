import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
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
  LOAD_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_FAILURE,
  LOAD_CATEGORY_POSTS_SUCCESS,
  LOAD_SEARCH_POSTS_REQUEST,
  LOAD_SEARCH_POSTS_SUCCESS,
  LOAD_SEARCH_POSTS_FAILURE,
  LOAD_TOP_RATED_COMMENT_POSTS_SUCCESS,
  LOAD_TOP_RATED_COMMENT_POSTS_FAILURE,
  LOAD_TOP_RATED_COMMENT_POSTS_REQUEST,
  LOAD_TOP_RATED_LIKE_POSTS_REQUEST,
  LOAD_TOP_RATED_LIKE_POSTS_SUCCESS,
  LOAD_TOP_RATED_LIKE_POSTS_FAILURE,
  LOAD_ALL_POSTS_REQUEST,
  LOAD_ALL_POSTS_SUCCESS,
  LOAD_ALL_POSTS_FAILURE
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
    const result = yield call(postApi, action.data);
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
  return axios.get("/posts/loadPosts?limit=10", {
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

//카테고리별 게시글 불러오기
function categoryPostsApi(data) {
  return axios.get(
    `/posts/${encodeURIComponent(data.word)}?lastId=${data.lastId || 0}&limit=9`
  );
}

function* categoryPosts(action) {
  try {
    const result = yield call(categoryPostsApi, action.data);
    yield put({
      type: LOAD_CATEGORY_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_CATEGORY_POSTS_FAILURE
    });
  }
}

function* watchcategoryPosts() {
  yield takeLatest(LOAD_CATEGORY_POSTS_REQUEST, categoryPosts);
}

//검색 게시글 불러오기
function loadsearchPostsApi(data) {
  return axios.get(
    `/posts/search/${encodeURIComponent(data.word)}
    ?lastId=${data.lastId || 0}&limit=9`
  );
}

function* loadsearchPosts(action) {
  try {
    const result = yield call(loadsearchPostsApi, action.data);
    yield put({
      type: LOAD_SEARCH_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_SEARCH_POSTS_FAILURE
    });
  }
}

function* watchLoadSearchPosts() {
  yield takeLatest(LOAD_SEARCH_POSTS_REQUEST, loadsearchPosts);
}

//좋아요 많은 게시글 불러오기
function loadTopLikedPostsApi() {
  return axios.get("/post/topLiked?limit=10");
}

function* loadTopLikedPosts() {
  try {
    const result = yield call(loadTopLikedPostsApi);
    yield put({
      type: LOAD_TOP_RATED_LIKE_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_TOP_RATED_LIKE_POSTS_FAILURE
    });
  }
}

function* watchLoadTopLikedPosts() {
  yield takeLatest(LOAD_TOP_RATED_LIKE_POSTS_REQUEST, loadTopLikedPosts);
}

//댓글 많은 게시글 불러오기
function loadTopCommentPostsApi() {
  return axios.get("/post/topRatedComment?limit=10");
}

function* loadTopCommentPosts() {
  try {
    const result = yield call(loadTopCommentPostsApi);
    yield put({
      type: LOAD_TOP_RATED_COMMENT_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_TOP_RATED_COMMENT_POSTS_FAILURE
    });
  }
}

function* watchloadTopCommentPosts() {
  yield takeLatest(LOAD_TOP_RATED_COMMENT_POSTS_REQUEST, loadTopCommentPosts);
}

//모든 게시글 불러오기
function loadAllPostsApi(data) {
  return axios.get(`/post/all?limit=9&lastId=${data.lastId}`);
}

function* loadAllPosts(action) {
  try {
    const result = yield call(loadAllPostsApi, action.data);
    console.log("resulresultt", result);
    yield put({
      type: LOAD_ALL_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_ALL_POSTS_FAILURE
    });
  }
}

function* watchLoadAllPosts() {
  yield throttle(2000, LOAD_ALL_POSTS_REQUEST, loadAllPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPostImage),
    fork(watchPost),
    fork(watchloadPosts),
    fork(watchcategoryPosts),
    fork(watchLoadSearchPosts),
    fork(watchLoadTopLikedPosts),
    fork(watchloadTopCommentPosts),
    fork(watchLoadAllPosts)
  ]);
}
