import produce from "immer";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE
} from "./actions/userAction";

export const initialState = {
  signUpErrorMessage: "",
  signUpFail: false,
  me: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      case SIGN_UP_FAILURE:
        draft.me = null;
        draft.signUpFail = true;
        draft.signUpErrorMessage = action.error;
        break;
      case LOG_IN_REQUEST:
        break;
      case LOG_IN_SUCCESS:
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        break;
      case LOG_OUT_REQUEST:
        break;
      case LOG_OUT_SUCCESS:
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        break;
    }
  });
};
