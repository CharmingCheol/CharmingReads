import React from "react";
import Link from "next/Link";
import {
  UserPost_Section,
  UserPost_HeartComment,
  UserPost_Image
} from "./style";

//hover 했을 때 좋아요, 댓글 수 출력하는 부분 해야 함
const UserPost = ({ post }) => {
  return (
    <>
      <Link
        href={{ pathname: "/book", query: { id: post.id } }}
        as={`/book/${post.id}`}
      >
        <a>
          <UserPost_Section>
            <UserPost_Image src={post.src} />
            <div className="UserPost_Post-Info">
              <UserPost_HeartComment>
                <i className="fas fa-heart"></i>
                <span>{post.Like.length}</span>
              </UserPost_HeartComment>
              <UserPost_HeartComment>
                <i className="fas fa-comment"></i>
                <span>{post.Comments.length}</span>
              </UserPost_HeartComment>
            </div>
          </UserPost_Section>
        </a>
      </Link>
    </>
  );
};

export default UserPost;
