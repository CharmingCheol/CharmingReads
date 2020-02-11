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
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAILURE,
  UPLOAD_IMAGE_REQUEST,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILURE
} from "./actions/userAction";

export const initialState = {
  signUpErrorMessage: "",
  signUpFail: false,
  me: null,
  iamge: null
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
      case LOAD_USER_REQUEST:
        break;
      case LOAD_USER_SUCCESS:
        draft.me = action.data;
        break;
      case LOAD_USER_FAILURE:
        break;
      case USER_EDIT_REQUEST:
        break;
      case USER_EDIT_SUCCESS:
        draft.me = action.data;
        break;
      case USER_EDIT_FAILURE:
        break;
      case UPLOAD_IMAGE_REQUEST:
        draft.image = null;
        break;
      case UPLOAD_IMAGE_SUCCESS:
        draft.image = action.data;
        break;
      case UPLOAD_IMAGE_FAILURE:
        draft.image = null;
        break;
    }
  });
};
