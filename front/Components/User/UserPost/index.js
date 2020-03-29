import React from "react";
import Link from "next/Link";
import { UserPost_Section, UserPost_HeartComment } from "./style";

//hover 했을 때 좋아요, 댓글 수 출력하는 부분 해야 함
const UserPost = ({ post }) => {
  return (
    <>
      <Link
        href={{ pathname: "/book", query: { id: post.id } }}
        as={`/book/${post.id}`}
      >
        <UserPost_Section className="UserPost_Post-Info" src={post.src}>
          <a>
            <figure></figure>
            <div className="UserPost_Post-Info">
              <UserPost_HeartComment>
                <div>
                  <i className="fas fa-heart"></i>
                  <h3>{post.likeCount}</h3>
                </div>
                <div>
                  <i className="fas fa-comment"></i>
                  <h3>{post.commentCount}</h3>
                </div>
              </UserPost_HeartComment>
            </div>
          </a>
        </UserPost_Section>
      </Link>
    </>
  );
};

export default UserPost;
