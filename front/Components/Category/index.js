import React from "react";
import Link from "next/link";

const CategoryBook = ({ post }) => {
  return (
    <>
      <div>
        <Link
          href={{ pathname: "/book", query: { id: post.id } }}
          as={`/book/${post.id}`}
        >
          <a>
            <img src={post.src} />
            <h3>{post.title}</h3>
          </a>
        </Link>
      </div>
    </>
  );
};

export default CategoryBook;
