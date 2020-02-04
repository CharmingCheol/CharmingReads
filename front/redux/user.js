import produce from "immer";
import {
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE
} from "./actions/userAction";

export const initialState = {
  signUpErrorMessage: "",
  signUpFail: false,
  me: null
};

const dummy = {
  id: 1,
  userId: "hello",
  name: "차민철"
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case SIGN_UP_REQUEST:
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      case SIGN_UP_SUCCESS:
        draft.me = dummy;
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      case SIGN_UP_FAILURE:
        draft.me = null;
        draft.signUpFail = true;
        draft.signUpErrorMessage = action.error;
        break;
    }
  });
};
