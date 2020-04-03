import React from "react";
import Link from "next/link";
import { Image, Book_Layout, Heart_Comment } from "./style";

const Book = ({ post, all }) => {
  return (
    <>
      <Book_Layout all={all}>
        <Link
          href={{ pathname: "/book", query: { id: post.id } }}
          as={`/book/${post.id}`}
        >
          <a>
            <Image postSrc={post.src} />
            <h3>{post.title}</h3>
          </a>
        </Link>
        <Heart_Comment>
          <div>
            <i className="fas fa-heart"></i>
            <h3>{post.likeCount}</h3>
          </div>
          <div>
            <i className="fas fa-comment"></i>
            <h3>{post.commentCount}</h3>
          </div>
        </Heart_Comment>
      </Book_Layout>
    </>
  );
};

export default Book;
