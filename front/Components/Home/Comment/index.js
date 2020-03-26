import React from "react";
import { CommentLayout } from "./style";

const Comment = ({ comment }) => {
  return (
    <>
      {comment.User ? (
        <CommentLayout>
          <img
            src={
              comment.User.src
                ? `http://localhost:3001/${comment.User.src}`
                : `http://localhost:3001/기본이미지.png`
            }
          />
          <div>
            <h3>{comment.User.nickName}</h3>
            <h3>{comment.content}</h3>
          </div>
        </CommentLayout>
      ) : null}
    </>
  );
};

export default Comment;
