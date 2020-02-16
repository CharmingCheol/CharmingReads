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
  LOAD_POSTS_FAILURE,
  POST_LIKE_REQUEST,
  POST_LIKE_SUCCESS,
  POST_LIKE_FAILURE,
  POST_LIKE_REMOVE_REQUEST,
  POST_LIKE_REMOVE_FAILURE,
  POST_LIKE_REMOVE_SUCCESS,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
} from "./actions/postAction";

export const initialState = {
  image: null,
  mainPosts: []
};

export default (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      //이미지 미리보기
      case LOAD_POST_IMAGE_REQUEST: {
        draft.image = null;
        break;
      }
      case LOAD_POST_IMAGE_SUCCESS: {
        draft.image = action.data;
        break;
      }
      case LOAD_POST_IMAGE_FAILURE: {
        draft.image = null;
        break;
      }
      //게시글 추가
      case ADD_POST_REQUEST: {
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.image = null;
        draft.mainPosts.unshift(action.data);
        break;
      }
      case ADD_POST_FAILURE: {
        break;
      }
      //게시글 불러오기
      case LOAD_POSTS_REQUEST: {
        break;
      }
      case LOAD_POSTS_SUCCESS: {
        draft.mainPosts = action.data;
        break;
      }
      case LOAD_POSTS_FAILURE: {
        break;
      }
      //좋아요 추가
      case POST_LIKE_REQUEST: {
        break;
      }
      case POST_LIKE_SUCCESS: {
        const likeIndex = draft.mainPosts.findIndex(
          like => like.id === action.data.id
        );
        draft.mainPosts[likeIndex].Like.unshift({ id: action.data.UserId });
        break;
      }
      case POST_LIKE_FAILURE: {
        break;
      }
      //좋아요 취소
      case POST_LIKE_REMOVE_REQUEST: {
        break;
      }
      case POST_LIKE_REMOVE_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          post => post.id === action.data.id
        );
        const userIndex = draft.mainPosts[postIndex].Like.findIndex(
          user => user.id === action.data.UserId
        );
        draft.mainPosts[postIndex].Like.splice(userIndex, 1);
        break;
      }
      case POST_LIKE_REMOVE_FAILURE: {
        break;
      }
      //댓글 추가
      case ADD_COMMENT_REQUEST: {
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        const postIndex = draft.mainPosts.findIndex(
          postIndex => postIndex.id === action.data.PostId
        );
        break;
      }
      case ADD_COMMENT_FAILURE: {
        break;
      }
    }
  });
};
