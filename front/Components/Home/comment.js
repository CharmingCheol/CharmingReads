import React from "react";
import styled from "styled-components";

const CommentLayout = styled.li`
  display: flex;
  margin-bottom: 5px;
  img {
    width: 10%;
    height: 10%;
    margin-right: 5px;
    border-radius: 20px;
  }
`;

const Comment = ({ comment }) => {
  return (
    <>
      <CommentLayout>
        <img
          src={
            comment.User.src
              ? `http://localhost:3001/${comment.User.src}`
              : `http://localhost:3001/기본이미지.png`
          }
        />
        <div>
          <div>{comment.User.nickName}</div>
          <div>{comment.content}</div>
        </div>
      </CommentLayout>
    </>
  );
};

export default Comment;
