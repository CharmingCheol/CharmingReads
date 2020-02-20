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
  LOAD_MODAL_POST_SUCCESS
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
  return axios.post("/post/loadComments", loadCommentsData, {
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

function* watchLoadCommentsLike() {
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

export default function*() {
  yield all([
    fork(watchPostLike),
    fork(watcPostRemoveLike),
    fork(watchAddCommentLike),
    fork(watchLoadCommentsLike),
    fork(watchLoadModal)
  ]);
}
