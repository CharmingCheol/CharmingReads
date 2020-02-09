import { all, call, fork, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { USER_EDIT_REQUEST } from "../redux/actions/userAction";

function userEditApi(userEditData) {
  console.log(userEditData);
  return axios.post("/user/edit", userEditData, {
    withCredentials: true
  });
}

function* userEdit(action) {
  const result = yield call(userEditApi, action.data);
  console.log(result);
}

function* watchUserEdit() {
  yield takeLatest(USER_EDIT_REQUEST, userEdit);
}

export default function* userDetail() {
  yield all([fork(watchUserEdit)]);
}
