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
  ADD_COMMENT_REQUEST
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
    console.log(result);
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

export default function*() {
  yield all([
    fork(watchPostLike),
    fork(watcPostRemoveLike),
    fork(watchAddCommentLike)
  ]);
}
