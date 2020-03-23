import React, { useRef, useCallback, useState } from "react";
import Router from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../Components/SignUp";
import {
  LOAD_POST_IMAGE_REQUEST,
  ADD_POST_REQUEST
} from "../redux/actions/postAction";
import {
  Post_section,
  Post_Input,
  Post_Confirm,
  Post_Image,
  Post_Payload,
  Post_Button
} from "../Components/Post/style";

const Post = () => {
  const [title, onTitle] = useInput();
  const [category, onCategory] = useState();
  const [content, onContent] = useInput();

  const { image } = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const postImage = useRef();

  //카테고리 변경
  const onChangeCategory = useCallback(event => {
    onCategory(event.target.value);
  }, []);

  //이미지 불러오기
  const clickPostImage = useCallback(() => {
    postImage.current.click();
  }, [postImage.current]);

  //이미지 미리보기
  const changePostImage = useCallback(event => {
    const postImage = new FormData();
    [].forEach.call(event.target.files, image => {
      postImage.append("image", image);
    });
    dispatch({
      type: LOAD_POST_IMAGE_REQUEST,
      data: postImage
    });
  }, []);

  //게시글 정보 전송
  const onSubmitPost = useCallback(
    event => {
      event.preventDefault();
      const postData = new FormData();
      postData.append("title", title);
      postData.append("category", category);
      postData.append("content", content);
      postData.append("image", image);
      dispatch({
        type: ADD_POST_REQUEST,
        data: postData
      });
      Router.push("/");
    },
    [title, category, content, image]
  );

  //뒤로 가기 버튼
  const onClickBack = useCallback(() => {
    history.back();
  }, []);

  return (
    <>
      <Post_section
        postImg={image}
        encType="multipart/form-data"
        onSubmit={onSubmitPost}
      >
        <div>
          <h3>사진 등록</h3>
          <input
            required
            hidden
            type="file"
            accept="image/*"
            ref={postImage}
            onChange={changePostImage}
          />
          <figure onClick={clickPostImage} />
        </div>
        <div>
          <h3>카테고리</h3>
          <select
            onChange={e => {
              onChangeCategory(e);
            }}
          >
            <option value="카테고리 선택">카테고리 선택</option>
            <option value="소설">소설</option>
            <option value="에세이">에세이</option>
            <option value="인문학">인문학</option>
            <option value="자기계발">자기계발</option>
            <option value="역사">역사</option>
            <option value="과학">과학</option>
            <option value="예술">예술</option>
            <option value="종교">종교</option>
            <option value="경제">경제</option>
            <option value="외국어">외국어</option>
            <option value="컴퓨터">컴퓨터</option>
            <option value="수험서">수험서</option>
          </select>
        </div>
        <div>
          <h3>제목</h3>
          <input onChange={onTitle} />
        </div>
        <div>
          <h3>내용</h3>
          <textarea onChange={onContent}></textarea>
        </div>
        <div>
          <button>게시</button>
          <button type="button" onClick={onClickBack}>
            취소
          </button>
        </div>
      </Post_section>
    </>
  );
};

export default Post;
