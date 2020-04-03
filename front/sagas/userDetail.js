import { all, call, fork, put, takeLatest, throttle } from "redux-saga/effects";
import axios from "axios";
import {
  USER_EDIT_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_FAILURE,
  LOAD_USER_DETAIL_SUCCESS,
  LOAD_USER_DETAIL_FAILURE,
  LOAD_USER_DETAIL_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_FAILURE,
  UNFOLLOW_SUCCESS,
  LOAD_FOLLOW_REQUEST,
  LOAD_FOLLOW_FAILURE,
  LOAD_FOLLOW_SUCCESS,
  LOAD_FOLLOWER_REQUEST,
  LOAD_FOLLOWER_FAILURE,
  LOAD_FOLLOWER_SUCCESS,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_SAVED_POSTS_REQUEST,
  LOAD_USER_SAVED_POSTS_SUCCESS,
  LOAD_USER_SAVED_POSTS_FAILURE
} from "../redux/actions/userAction";

//유저 정보 변경
function userEditApi(userEditData) {
  return axios.patch("/user/edit", userEditData, {
    withCredentials: true
  });
}

function* userEdit(action) {
  try {
    const result = yield call(userEditApi, action.data);
    yield put({
      type: USER_EDIT_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: USER_EDIT_FAILURE
    });
  }
}

function* watchUserEdit() {
  yield takeLatest(USER_EDIT_REQUEST, userEdit);
}

//내 정보 로드
function loadUserApi() {
  return axios.get(`/user/loadUser`, {
    withCredentials: true
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserApi);
    console.log(result);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_FAILURE
    });
  }
}

function* watchloadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

//이미지 업로드
function uploadImageApi(formData) {
  return axios.post(`/user/uploadImage`, formData, {
    withCredentials: true
  });
}

function* uploadImage(action) {
  try {
    const result = yield call(uploadImageApi, action.data);
    yield put({
      type: UPLOAD_IMAGE_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGE_FAILURE
    });
  }
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImage);
}

//유저 상세 정보 불러오기
function loadUserDetailApi(id) {
  return axios.get(`/user/${id || 0}`);
}

function* loadUserDetail(action) {
  try {
    const result = yield call(loadUserDetailApi, action.data);
    yield put({
      type: LOAD_USER_DETAIL_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_DETAIL_FAILURE
    });
  }
}

function* watchLoadUserDetail() {
  yield takeLatest(LOAD_USER_DETAIL_REQUEST, loadUserDetail);
}

//팔로우
function followApi(data) {
  return axios.post(
    `/user/${data.user}/follow`,
    { followCount: data.followCount, followerCount: data.followerCount },
    {
      withCredentials: true
    }
  );
}

function* follow(action) {
  try {
    const result = yield call(followApi, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      me: action.data.me,
      user: action.data.user
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: FOLLOW_FAILURE
    });
  }
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

//언팔로우
function unfollowApi(data) {
  return axios.post(
    `/user/${data.user}/unfollow`,
    { followCount: data.followCount, followerCount: data.followerCount },
    {
      withCredentials: true
    }
  );
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowApi, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UNFOLLOW_FAILURE
    });
  }
}

function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

//팔로우 리스트 불러오기
function loadFollowApi(lastId, userId, limit = 5) {
  return axios.get(`/user/${userId}/follow/?lastId=${lastId}&limit=${limit}`);
}

function* loadFollow(action) {
  try {
    const result = yield call(loadFollowApi, action.lastId, action.userId);
    yield put({
      type: LOAD_FOLLOW_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOW_FAILURE
    });
  }
}

function* watchLoadFollow() {
  yield throttle(2000, LOAD_FOLLOW_REQUEST, loadFollow);
}

//팔로워 리스트 불러오기
function loadFollowerApi(lastId, userId, limit = 5) {
  return axios.get(`/user/${userId}/follower/?lastId=${lastId}&limit=${limit}`);
}

function* loadFollower(action) {
  try {
    const result = yield call(loadFollowerApi, action.lastId, action.userId);
    yield put({
      type: LOAD_FOLLOWER_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_FOLLOWER_FAILURE
    });
  }
}

function* watchLoadFollower() {
  yield throttle(2000, LOAD_FOLLOWER_REQUEST, loadFollower);
}

//유저 게시글 불러오기
function loadUserPostsApi(data, limit = 9) {
  return axios.get(
    `/user/${data.userId}/userPosts?lastId=${data.lastId}&limit=${limit}`
  );
}

function* loadUserPosts(action) {
  try {
    const result = yield call(loadUserPostsApi, action.data);
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POSTS_FAILURE
    });
  }
}

function* watchLoadUserPosts() {
  yield throttle(2000, LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

//유저 저장 게시글 불러오기
function loadUserSavedPostsApi(data, limit = 9) {
  return axios.get(
    `/user/${data.userId}/userSavedPosts?lastId=${data.lastId}&limit=${limit}`
  );
}

function* loadUserSavedPosts(action) {
  try {
    const result = yield call(loadUserSavedPostsApi, action.data);
    yield put({
      type: LOAD_USER_SAVED_POSTS_SUCCESS,
      data: result.data
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_SAVED_POSTS_FAILURE
    });
  }
}

function* watchLoadUserSavedPosts() {
  yield throttle(2000, LOAD_USER_SAVED_POSTS_REQUEST, loadUserSavedPosts);
}

export default function* userDetail() {
  yield all([
    fork(watchUserEdit),
    fork(watchloadUser),
    fork(watchUploadImage),
    fork(watchLoadUserDetail),
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLoadFollow),
    fork(watchLoadFollower),
    fork(watchLoadUserPosts),
    fork(watchLoadUserSavedPosts)
  ]);
}
