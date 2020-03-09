import React from "react";
import Link from "next/link";

const Title = ({ title }) => {
  return (
    <>
      <Link
        href={{ pathname: "/explore/category", query: { word: title } }}
        as={`/explore/category/${title}`}
      >
        <a>
          <li>{title}</li>
        </a>
      </Link>
    </>
  );
};

export default Title;
