import React from "react";
import Link from "next/link";
import { Image } from "./style";

const Book = ({ post }) => {
  return (
    <>
      <div>
        <Link
          href={{ pathname: "/book", query: { id: post.id } }}
          as={`/book/${post.id}`}
        >
          <a>
            <Image src={`http://localhost:3001/${post.src}`} />
            <div>{post.title}</div>
          </a>
        </Link>
      </div>
    </>
  );
};

export default Book;
