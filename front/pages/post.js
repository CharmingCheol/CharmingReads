import React, { useRef, useCallback, useState } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";

import { useInput } from "../Components/SignUp";
import {
  LOAD_POST_IMAGE_REQUEST,
  ADD_POST_REQUEST
} from "../redux/actions/postAction";

const Post_section = styled.div``;

const Image = styled.img`
  width: 150px;
  height: 150px;
  display: none;
`;

const Post_Input = styled.div`
  & div {
    display: flex;
    margin-bottom: 10px;
    & h3 {
      width: 80px;
      margin-right: 10px;
    }
    & input {
      width: 50vw;
    }
  }
`;

const Post_Confirm = styled.div`
  position: relative;
  &:hover ${Image} {
    display: block;
    position: absolute;
    left: 120px;
    transform: scale(2);
    transform-origin: left top;
  }
`;

const Post_Payload = styled.div`
  & textarea {
    width: 100%;
    height: 50vw;
    padding: 30px;
    margin: 10px 0 10px 0;
  }
`;

const Post_Button = styled.div`
  float: right;
  & button {
    margin-bottom: 30px;
    &:first-child {
      margin-right: 10px;
    }
  }
`;

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
      <Post_section>
        <form encType="multipart/form-data" onSubmit={onSubmitPost}>
          <Post_Input>
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
            <Post_Confirm>
              <h3>사진 선택</h3>
              <i className="fas fa-book" onClick={clickPostImage}></i>
              <input
                required
                hidden
                type="file"
                accept="image/*"
                ref={postImage}
                onChange={changePostImage}
              />
              <Image src={image} />
            </Post_Confirm>
            <div>
              <h5>
                사진 선택 텍스트에 마우스를 올리시면 등록한 사진을 볼 수
                있습니다
              </h5>
            </div>
          </Post_Input>
          <Post_Payload>
            <h3>내용</h3>
            <textarea onChange={onContent}></textarea>
          </Post_Payload>
          <Post_Button>
            <button>게시</button>
            <button type="button" onClick={onClickBack}>
              취소
            </button>
          </Post_Button>
        </form>
      </Post_section>
    </>
  );
};

export default Post;
