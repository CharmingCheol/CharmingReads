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
  ADD_POST_STORAGE_SUCCESS,
  ADD_POST_STORAGE_FAILURE,
  ADD_POST_STORAGE_REQUEST
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

//유저 정보 로드
function loadUserApi() {
  return axios.get(`/user/loadUser`, {
    withCredentials: true
  });
}

function* loadUser() {
  try {
    const result = yield call(loadUserApi);
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

//게시글 저장
function addPostStorageApi(addPostStorageData) {
  return axios.post("/user/addPostStorage", addPostStorageData, {
    withCredentials: true
  });
}

function* addPostStorage(action) {
  try {
    const result = yield call(addPostStorageApi, action.data);
    console.log(result.data);
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

export default function* userDetail() {
  yield all([
    fork(watchUserEdit),
    fork(watchloadUser),
    fork(watchUploadImage),
    fork(watchAddPostStorage)
  ]);
}
