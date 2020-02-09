import { call, all } from "redux-saga/effects";
import axios from "axios";

import userAuthSaga from "./userAuth";
import OAuthSaga from "./oauth";
import userDetail from "./userDetail";

axios.defaults.baseURL = "http://localhost:3001";

export default function*() {
  yield all([call(userAuthSaga), call(OAuthSaga), call(userDetail)]);
}
