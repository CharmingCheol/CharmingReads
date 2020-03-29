import React from "react";
import { CommentLayout } from "./style";

const Comment = ({ comment }) => {
  const { content, User } = comment;
  return (
    <>
      {User ? (
        <CommentLayout profileSrc={User.src}>
          <figure></figure>
          <div>
            <h3>{User.nickName}</h3>
            <h3>{content}</h3>
          </div>
        </CommentLayout>
      ) : null}
    </>
  );
};

export default Comment;
