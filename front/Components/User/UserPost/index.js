import React from "react";
import Link from "next/Link";
import { UserPost_Image } from "./style";

//hover 했을 때 좋아요, 댓글 수 출력하는 부분 해야 함
const UserPost = ({ post }) => {
  return (
    <Link
      href={{ pathname: "/book", query: { id: post.UserId } }}
      as={`/book/${post.UserId}`}
    >
      <a>
        <UserPost_Image>
          <img src={`http://localhost:3001/${post.src}`} />
        </UserPost_Image>
      </a>
    </Link>
  );
};

export default UserPost;
