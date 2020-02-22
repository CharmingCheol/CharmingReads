import React from "react";
import { CommentLayout } from "./style";

const Comment = ({ comment }) => {
  return (
    <>
      {comment ? (
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
      ) : null}
    </>
  );
};

export default Comment;
