import produce from "immer";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "./actions/userAction";

export const initialState = {
  signUpErrorMessage: "",
  me: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpErrorMessage = "";
      case SIGN_UP_SUCCESS:
        draft.me = action.data;
        draft.signUpErrorMessage = "";
      case SIGN_UP_FAILURE:
        draft.signUpErrorMessage = action.error;
    }
  });
};
