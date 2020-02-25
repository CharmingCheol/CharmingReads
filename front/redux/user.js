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
  LOAD_USER_DETAIL_FAILURE
} from "./actions/userAction";
import {
  ADD_POST_STORAGE_REQUEST,
  ADD_POST_STORAGE_SUCCESS,
  ADD_POST_STORAGE_FAILURE,
  REMOVE_POST_STORAGE_REQUEST,
  REMOVE_POST_STORAGE_SUCCESS,
  REMOVE_POST_STORAGE_FAILURE
} from "./actions/postAction";

export const initialState = {
  signUpErrorMessage: "",
  signUpFail: false,
  me: null,
  iamge: null,
  modalInfo: null,
  userInfo: null
};

export default (state = initialState, action) => {
  return produce(state, draft => {
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
      //유저 정보 로드
      case LOAD_USER_REQUEST: {
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
        draft.me.PostStorages.unshift({ postId: action.data });
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
          post => post.postId === action.data
        );
        draft.me.PostStorages.splice(userIndex, 1);
        break;
      }
      case REMOVE_POST_STORAGE_FAILURE: {
        break;
      }
      //유저 정보 불러오기
      case LOAD_USER_DETAIL_REQUEST: {
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
      case LOAD_USER_DETAIL_REQUEST: {
        break;
      }
      case LOAD_USER_DETAIL_SUCCESS: {
        // draft.userInfo.push()
        break;
      }
      case LOAD_USER_DETAIL_FAILURE: {
        break;
      }
    }
  });
};
