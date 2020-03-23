import axios from "axios";
import { all, call, fork, takeLatest, put } from "redux-saga/effects";
import {
  POST_LIKE_REQUEST,
  POST_LIKE_FAILURE,
  POST_LIKE_SUCCESS,
  POST_LIKE_REMOVE_REQUEST,
  POST_LIKE_REMOVE_SUCCESS,
  POST_LIKE_REMOVE_FAILURE,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_MODAL_POST_FAILURE,
  LOAD_MODAL_POST_REQUEST,
  LOAD_MODAL_POST_SUCCESS,
  ADD_POST_STORAGE_REQUEST,
  ADD_POST_STORAGE_FAILURE,
  ADD_POST_STORAGE_SUCCESS,
  REMOVE_POST_STORAGE_SUCCESS,
  REMOVE_POST_STORAGE_FAILURE,
  REMOVE_POST_STORAGE_REQUEST
} from "../redux/actions/postAction";

//좋아요 누르기
function postLikeApi(postLikeData) {
  return axios.post("/post/like", postLikeData, {
    withCredentials: true
  });
}

function* postLike(action) {
  try {
    const result = yield call(postLikeApi, action.data);
    console.log(result);
    yield put({
      type: POST_LIKE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: POST_LIKE_FAILURE
    });
  }
}

function* watchPostLike() {
  yield takeLatest(POST_LIKE_REQUEST, postLike);
}

//좋아요 취소
function postLikeRemoveApi(postLikeRemoveData) {
  return axios.post("/post/likeRemove", postLikeRemoveData, {
    withCredentials: true
  });
}

function* postLikeRemove(action) {
  try {
    const result = yield call(postLikeRemoveApi, action.data);
    console.log(result);
    yield put({
      type: POST_LIKE_REMOVE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: POST_LIKE_REMOVE_FAILURE
    });
  }
}

function* watcPostRemoveLike() {
  yield takeLatest(POST_LIKE_REMOVE_REQUEST, postLikeRemove);
}

//댓글 추가
function addCommentApi(addCommentData) {
  return axios.post("/post/addComment", addCommentData, {
    withCredentials: true
  });
}

function* addComment(action) {
  try {
    const result = yield call(addCommentApi, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE
    });
  }
}

function* watchAddCommentLike() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

//댓글 불러오기
function loadCommentsApi(loadCommentsData) {
  return axios.get(`/post/loadComments?postId=${loadCommentsData}`, {
    withCredentials: true
  });
}

function* loadComments(action) {
  try {
    const result = yield call(loadCommentsApi, action.data);
    yield put({
      type: LOAD_COMMENTS_SUCCESS,
      data: result.data,
      post: action.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_COMMENTS_FAILURE
    });
  }
}

function* watchLoadComments() {
  yield takeLatest(LOAD_COMMENTS_REQUEST, loadComments);
}

//modal 불러오기
function loadModalApi(loadModalData) {
  return axios.get(`/post/${loadModalData}/loadModal`, {
    withCredentials: true
  });
}

function* loadModal(action) {
  try {
    const result = yield call(loadModalApi, action.data);
    yield put({
      type: LOAD_MODAL_POST_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_MODAL_POST_FAILURE
    });
  }
}

function* watchLoadModal() {
  yield takeLatest(LOAD_MODAL_POST_REQUEST, loadModal);
}

//게시글 저장
function addPostStorageApi(addPostStorageData) {
  return axios.post("/user/addPostStorage", addPostStorageData, {
    withCredentials: true
  });
}

function* addPostStorage(action) {
  try {
    const result = yield call(addPostStorageApi, action.data);
    yield put({
      type: ADD_POST_STORAGE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_POST_STORAGE_FAILURE
    });
  }
}

function* watchAddPostStorage() {
  yield takeLatest(ADD_POST_STORAGE_REQUEST, addPostStorage);
}

//게시글 저장 취소
function removePostStorageApi(postId) {
  return axios.delete(`/user/${postId}/removePostStorage`, {
    withCredentials: true
  });
}

function* removePostStorage(action) {
  try {
    const result = yield call(removePostStorageApi, action.data);
    yield put({
      type: REMOVE_POST_STORAGE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: REMOVE_POST_STORAGE_FAILURE
    });
  }
}

function* watchRemovePostStorage() {
  yield takeLatest(REMOVE_POST_STORAGE_REQUEST, removePostStorage);
}

export default function*() {
  yield all([
    fork(watchPostLike),
    fork(watcPostRemoveLike),
    fork(watchAddCommentLike),
    fork(watchLoadComments),
    fork(watchLoadModal),
    fork(watchAddPostStorage),
    fork(watchRemovePostStorage)
  ]);
}
