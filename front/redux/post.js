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
  ADD_COMMENT_FAILURE,
  LOAD_COMMENTS_REQUEST,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAILURE,
  LOAD_MODAL_POST_REQUEST,
  LOAD_MODAL_POST_SUCCESS,
  LOAD_MODAL_POST_FAILURE,
  LOAD_CATEGORY_POSTS_REQUEST,
  LOAD_CATEGORY_POSTS_SUCCESS,
  LOAD_CATEGORY_POSTS_FAILURE
} from "./actions/postAction";

export const initialState = {
  image: null,
  mainPosts: [],
  modalPost: []
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
      //카테고리별 게시글 불러오기
      case LOAD_POSTS_REQUEST: {
        break;
      }
      case LOAD_CATEGORY_POSTS_SUCCESS:
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
        draft.modalPost.Like.unshift({ id: action.data.UserId });
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
        const userIndex = draft.modalPost.Like.findIndex(
          user => user.id === action.data.UserId
        );
        draft.modalPost.Like.splice(userIndex, 1);
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
        draft.modalPost.Comments.push(action.data.comment);
        break;
      }
      case ADD_COMMENT_FAILURE: {
        break;
      }
      //댓글 불러오기
      case LOAD_COMMENTS_REQUEST: {
        break;
      }
      case LOAD_COMMENTS_SUCCESS: {
        draft.modalPost.Comments = action.data;
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }
      //modal 불러오기
      case LOAD_MODAL_POST_REQUEST: {
        break;
      }
      case LOAD_MODAL_POST_SUCCESS: {
        draft.modalPost = action.data;
        break;
      }
      case LOAD_MODAL_POST_FAILURE: {
        break;
      }
    }
  });
};
