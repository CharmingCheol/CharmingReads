import { call, all } from "redux-saga/effects";
import userSaga from "./user";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export default function*() {
  yield all([call(userSaga)]);
}
