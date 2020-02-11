import produce from "immer";
import {
  LOAD_POST_IMAGE_REQUEST,
  LOAD_POST_IMAGE_SUCCESS,
  LOAD_POST_IMAGE_FAILURE
} from "./actions/postAction";

export const initialState = {
  image: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case LOAD_POST_IMAGE_REQUEST:
        draft.image = null;
        break;
      case LOAD_POST_IMAGE_SUCCESS:
        draft.image = action.data;
        break;
      case LOAD_POST_IMAGE_FAILURE:
        draft.image = null;
        break;
    }
  });
};
