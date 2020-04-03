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
  LOAD_CATEGORY_POSTS_FAILURE,
  LOAD_SEARCH_POSTS_SUCCESS,
  LOAD_TOP_RATED_LIKE_POSTS_REQUEST,
  LOAD_TOP_RATED_LIKE_POSTS_SUCCESS,
  LOAD_TOP_RATED_LIKE_POSTS_FAILURE,
  LOAD_TOP_RATED_COMMENT_POSTS_REQUEST,
  LOAD_TOP_RATED_COMMENT_POSTS_SUCCESS,
  LOAD_TOP_RATED_COMMENT_POSTS_FAILURE,
  LOAD_ALL_POSTS_REQUEST,
  LOAD_ALL_POSTS_SUCCESS,
  LOAD_ALL_POSTS_FAILURE,
  LOAD_SEARCH_POSTS_REQUEST,
  LOAD_SEARCH_POSTS_FAILURE
} from "./actions/postAction";

export const initialState = {
  image: null,
  mainPosts: [],
  modalPost: null,
  mostLikePosts: [],
  mostCommentPosts: [],
  allPosts: [],
  hasMoreComments: true,
  hasMoreCategoryPosts: null,
  hasMoreSearchPosts: null,
  hasMoreAllPosts: null
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
      case LOAD_SEARCH_POSTS_REQUEST:
      case LOAD_CATEGORY_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST: {
        draft.mainPosts = [];
        break;
      }
      case LOAD_SEARCH_POSTS_SUCCESS:
      case LOAD_CATEGORY_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS: {
        if (!action.data) {
          return;
        }
        if (action.type === LOAD_POSTS_SUCCESS) {
          draft.mainPosts = action.data;
          return;
        }
        if (action.type === LOAD_CATEGORY_POSTS_SUCCESS) {
          action.data.forEach(post => draft.mainPosts.push(post));
          draft.hasMoreCategoryPosts = action.data.length === 9;
          return;
        }
        if (action.type === LOAD_SEARCH_POSTS_SUCCESS) {
          action.data.forEach(post => draft.mainPosts.push(post));
          draft.hasMoreSearchPosts = action.data.length === 9;
        }
        break;
      }
      case LOAD_SEARCH_POSTS_FAILURE:
      case LOAD_CATEGORY_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE: {
        break;
      }
      //modal 불러오기
      case LOAD_MODAL_POST_REQUEST: {
        draft.modalPost = null;
        break;
      }
      case LOAD_MODAL_POST_SUCCESS: {
        draft.modalPost = action.data;
        break;
      }
      case LOAD_MODAL_POST_FAILURE: {
        break;
      }
      //좋아요 추가
      case POST_LIKE_REQUEST: {
        break;
      }
      case POST_LIKE_SUCCESS: {
        draft.modalPost.Like.unshift({ id: action.data });
        draft.modalPost.likeCount += 1;
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
        draft.modalPost.Like = draft.modalPost.Like.filter(
          id => Object.values(id)[0] !== action.data
        );
        draft.modalPost.likeCount -= 1;
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
        draft.modalPost.Comments.push(action.data);
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
        action.data.forEach(comment => draft.modalPost.Comments.push(comment));
        draft.hasMoreComments = action.data.length === 6;
        break;
      }
      case LOAD_COMMENTS_FAILURE: {
        break;
      }
      //좋아요 많은 10개 게시글 불러오기
      case LOAD_TOP_RATED_LIKE_POSTS_REQUEST: {
        draft.mostLikePosts = [];
        break;
      }
      case LOAD_TOP_RATED_LIKE_POSTS_SUCCESS: {
        action.data.forEach(post => draft.mostLikePosts.push(post));
        break;
      }
      case LOAD_TOP_RATED_LIKE_POSTS_FAILURE: {
        break;
      }
      //댓글 많은 10개 게시글 불러오기
      case LOAD_TOP_RATED_COMMENT_POSTS_REQUEST: {
        draft.mostCommentPosts = [];
        break;
      }
      case LOAD_TOP_RATED_COMMENT_POSTS_SUCCESS: {
        action.data.forEach(post => draft.mostCommentPosts.push(post));
        break;
      }
      case LOAD_TOP_RATED_COMMENT_POSTS_FAILURE: {
        break;
      }
      //모든 게시글 불러오기
      case LOAD_ALL_POSTS_REQUEST: {
        draft.allPosts = draft.allPosts ? draft.allPosts : [];
        break;
      }
      case LOAD_ALL_POSTS_SUCCESS: {
        action.data.forEach(post => draft.allPosts.push(post));
        draft.hasMoreAllPosts = action.data.length === 9;
        break;
      }
      case LOAD_ALL_POSTS_FAILURE: {
        break;
      }
    }
  });
};
