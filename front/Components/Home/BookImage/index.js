import React from "react";
import Link from "next/link";
import { Image, Book_Layout } from "./style";

const Book = ({ post }) => {
  return (
    <>
      <Book_Layout>
        <Link
          href={{ pathname: "/book", query: { id: post.id } }}
          as={`/book/${post.id}`}
        >
          <a>
            <Image src={post.src} />
            <h3>{post.title}</h3>
          </a>
        </Link>
      </Book_Layout>
    </>
  );
};

export default Book;
