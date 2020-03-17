import React from "react";
import Link from "next/link";

const Title = ({ title }) => {
  return (
    <>
      <Link
        href={{ pathname: "/explore/category", query: { word: title } }}
        as={`/explore/category/${title}`}
      >
        <li>
          <a>{title}</a>
        </li>
      </Link>
    </>
  );
};

export default Title;
