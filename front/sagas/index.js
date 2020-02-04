import { call, all } from "redux-saga/effects";
import userSaga from "./user";

export default function*() {
  yield all([call(userSaga)]);
}
