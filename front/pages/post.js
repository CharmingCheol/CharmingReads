import React, { useRef, useCallback } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { useInput } from "../Components/SignUp";
import {
  LOAD_POST_IMAGE_REQUEST,
  ADD_POST_REQUEST
} from "../redux/actions/postAction";

const Image = styled.img`
  width: 150px;
  height: 150px;
`;

const Post = () => {
  const [title, onTitle] = useInput();
  const [hashTag, onHashTag] = useInput();
  const [content, onContent] = useInput();

  const { image } = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const postImage = useRef();

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

  const clickPostImage = useCallback(() => {
    postImage.current.click();
  }, [postImage.current]);

  const onSubmitPost = useCallback(
    event => {
      event.preventDefault();
      const postData = new FormData();
      postData.append("title", title);
      postData.append("hashTag", hashTag);
      postData.append("content", content);
      postData.append("image", image);
      dispatch({
        type: ADD_POST_REQUEST,
        data: postData
      });
      Router.push("/");
    },
    [title, hashTag, content, image]
  );

  return (
    <>
      <form encType="multipart/form-data" onSubmit={onSubmitPost}>
        <div>
          <span>제목</span>
          <input onChange={onTitle} />
        </div>
        <div>
          <span>해시태그</span>
          <input onChange={onHashTag} />
        </div>
        <div>
          <span>내용</span>
          <input onChange={onContent} />
        </div>
        <div>
          <input
            hidden
            type="file"
            accept="image/*"
            ref={postImage}
            onChange={changePostImage}
          />
          <Image onClick={clickPostImage} src={image} />
        </div>
        <button>게시</button>
        <button>취소</button>
      </form>
    </>
  );
};

export default Post;
