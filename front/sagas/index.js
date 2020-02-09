import { call, all } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import oauthSaga from "./oauth";

axios.defaults.baseURL = "http://localhost:3001";

export default function*() {
  yield all([call(userSaga), call(oauthSaga)]);
}
