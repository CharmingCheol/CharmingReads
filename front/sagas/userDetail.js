import { all, call, fork, put, takeLatest } from "redux-saga/effects";
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
  FOLLOW_REQUEST
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
  console.log(id, id.id, { id });
  return axios.get(`/user/${id}?id=${id}`);
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
    `/user/${data.postId}`,
    { userId: data.userId },
    {
      withCredentials: true
    }
  );
}

function* follow(action) {
  try {
    const result = yield call(followApi, action.data);
    console.log(result);
    // yield put({
    //   type: FOLLOW_SUCCESS,
    //   data: result.data
    // });
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

export default function* userDetail() {
  yield all([
    fork(watchUserEdit),
    fork(watchloadUser),
    fork(watchUploadImage),
    fork(watchLoadUserDetail),
    fork(watchFollow)
  ]);
}
