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
  UPLOAD_IMAGE_FAILURE,
  LOAD_USER_DETAIL_REQUEST,
  LOAD_USER_DETAIL_SUCCESS,
  LOAD_USER_DETAIL_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOWER_REQUEST,
  FOLLOWER_SUCCESS,
  FOLLOWER_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
  LOAD_FOLLOW_REQUEST,
  LOAD_FOLLOW_SUCCESS,
  LOAD_FOLLOW_FAILURE,
  LOAD_FOLLOWER_REQUEST,
  LOAD_FOLLOWER_SUCCESS,
  LOAD_FOLLOWER_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_SAVED_POSTS_REQUEST,
  LOAD_USER_SAVED_POSTS_SUCCESS,
  LOAD_USER_SAVED_POSTS_FAILURE,
} from "./actions/userAction";
import {
  ADD_POST_STORAGE_REQUEST,
  ADD_POST_STORAGE_SUCCESS,
  ADD_POST_STORAGE_FAILURE,
  REMOVE_POST_STORAGE_REQUEST,
  REMOVE_POST_STORAGE_SUCCESS,
  REMOVE_POST_STORAGE_FAILURE,
} from "./actions/postAction";

export const initialState = {
  signUpErrorMessage: "",
  signUpFail: false,
  me: null,
  iamge: null,
  modalInfo: null,
  userInfo: {},
  userPosts: [],
  userSavedPosts: [],
  hasMoreFollow: null,
  hasMoreFollower: null,
  hasMoreUserPost: true,
  hasMoreUserSavedPost: null,
};

export default (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      //회원가입
      case SIGN_UP_REQUEST: {
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.signUpFail = false;
        draft.signUpErrorMessage = "";
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.me = null;
        draft.signUpFail = true;
        draft.signUpErrorMessage = action.error;
        break;
      }
      //로그인
      case LOG_IN_REQUEST: {
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.me = action.data;
        break;
      }
      case LOG_IN_FAILURE: {
        break;
      }
      //로그아웃
      case LOG_OUT_REQUEST: {
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.me = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        break;
      }
      //내 정보 로드
      case LOAD_USER_REQUEST: {
        draft.me = null;
        break;
      }
      case LOAD_USER_SUCCESS: {
        draft.me = action.data;
        break;
      }
      case LOAD_USER_FAILURE: {
        break;
      }
      //내 정보 변경
      case USER_EDIT_REQUEST: {
        break;
      }
      case USER_EDIT_SUCCESS: {
        draft.me = action.data;
        break;
      }
      case USER_EDIT_FAILURE: {
        break;
      }
      //이미지 불러오기
      case UPLOAD_IMAGE_REQUEST: {
        draft.image = null;
        break;
      }
      case UPLOAD_IMAGE_SUCCESS: {
        draft.image = action.data;
        break;
      }
      case UPLOAD_IMAGE_FAILURE: {
        draft.image = null;
        break;
      }
      //게시글 저장
      case ADD_POST_STORAGE_REQUEST: {
        break;
      }
      case ADD_POST_STORAGE_SUCCESS: {
        draft.me.PostStorages.push({ postId: action.data });
        break;
      }
      case ADD_POST_STORAGE_FAILURE: {
        break;
      }
      //게시글 저장 취소
      case REMOVE_POST_STORAGE_REQUEST: {
        break;
      }
      case REMOVE_POST_STORAGE_SUCCESS: {
        const userIndex = draft.me.PostStorages.findIndex(
          (post) => post.postId === action.data
        );
        draft.me.PostStorages.splice(userIndex, 1);
        break;
      }
      case REMOVE_POST_STORAGE_FAILURE: {
        break;
      }
      //유저 정보 불러오기
      case LOAD_USER_DETAIL_REQUEST: {
        draft.userInfo = {};
        break;
      }
      case LOAD_USER_DETAIL_SUCCESS: {
        draft.userInfo = action.data;
        break;
      }
      case LOAD_USER_DETAIL_FAILURE: {
        break;
      }
      //팔로우
      case FOLLOW_REQUEST: {
        break;
      }
      case FOLLOW_SUCCESS: {
        draft.me.Follow.unshift({ id: action.user });
        draft.userInfo.Follower.unshift({ id: action.me });
        break;
      }
      case FOLLOW_FAILURE: {
        break;
      }
      //언팔로우
      case UNFOLLOW_REQUEST: {
        break;
      }
      case UNFOLLOW_SUCCESS: {
        draft.me.Follow.splice({ id: action.data.id }, 1);
        draft.userInfo.Follower.splice({ id: action.data }, 1);
        break;
      }
      case UNFOLLOW_FAILURE: {
        break;
      }
      //팔로우 리스트 불러오기
      case LOAD_FOLLOW_REQUEST: {
        break;
      }
      case LOAD_FOLLOW_SUCCESS: {
        action.data.Follow.forEach((follow) =>
          draft.userInfo.Follow.push(follow)
        );
        draft.hasMoreFollow =
          action.data.Follow[action.data.Follow.length - 1].id;
        break;
      }
      case LOAD_FOLLOW_FAILURE: {
        break;
      }
      //팔로워 리스트 불러오기
      case LOAD_FOLLOWER_REQUEST: {
        break;
      }
      case LOAD_FOLLOWER_SUCCESS: {
        action.data.Follower.forEach((follower) =>
          draft.userInfo.Follower.push(follower)
        );
        draft.hasMoreFollower =
          action.data.Follower[action.data.Follower.length - 1].id;
        break;
      }
      case LOAD_FOLLOWER_FAILURE: {
        break;
      }
      //유저 게시글 불러오기
      case LOAD_USER_POSTS_REQUEST: {
        draft.userPosts = action.data.lastId ? draft.userPosts : [];
        break;
      }
      case LOAD_USER_POSTS_SUCCESS: {
        if (action.data.id === 0) {
          return;
        } else {
          action.data.forEach((post) => draft.userPosts.push(post));
          draft.hasMoreUserPost = action.data.length === 9;
          // draft.hasMoreUserPost = action.data[action.data.length - 1].id;
        }
        break;
      }
      case LOAD_USER_POSTS_FAILURE: {
        break;
      }
      //유저 저장 게시글 불러오기
      case LOAD_USER_SAVED_POSTS_REQUEST: {
        draft.userSavedPosts = action.data.lastId ? draft.userSavedPosts : [];
        break;
      }
      case LOAD_USER_SAVED_POSTS_SUCCESS: {
        if (action.data.id === 0) {
          return;
        } else {
          action.data.forEach((post) => draft.userSavedPosts.push(post));
          draft.hasMoreUserSavedPost = action.data.length === 9;
        }
        break;
      }
      case LOAD_USER_SAVED_POSTS_FAILURE: {
        break;
      }
    }
  });
};
