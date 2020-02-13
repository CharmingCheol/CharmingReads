import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 10vw;
  height: 15vw;
`;

const Book = ({ post }) => {
  console.log(post);
  return (
    <div>
      <Image src={`http://localhost:3001/${post.src}`} />
      <div>{post.title}</div>
    </div>
  );
};

export default Book;
