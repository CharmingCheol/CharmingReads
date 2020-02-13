import produce from "immer";
import {
  LOAD_POST_IMAGE_REQUEST,
  LOAD_POST_IMAGE_SUCCESS,
  LOAD_POST_IMAGE_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE
} from "./actions/postAction";

export const initialState = {
  image: null,
  mainPosts: []
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
      case ADD_POST_REQUEST:
        break;
      case ADD_POST_SUCCESS:
        draft.image = null;
        draft.mainPosts.unshift(action.data);
        break;
      case ADD_POST_FAILURE:
        break;
      case LOAD_POSTS_REQUEST:
        break;
      case LOAD_POSTS_SUCCESS:
        draft.mainPosts = action.data;
        break;
      case LOAD_POSTS_FAILURE:
        break;
    }
  });
};
