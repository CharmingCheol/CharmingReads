import React from "react";
import BookList from "../Components/Home/BookList";
import Description from "../Components/Home/Description";
import Category from "../Components/Home/Category";

import styled from "styled-components";
const Test = styled.div`
  position: relative;
  top: -7vh;
  z-index: -1;
`;

const Home = () => {
  return (
    <>
      <Test>
        <Description />
        <Category />
      </Test>
      <BookList />
    </>
  );
};

export default Home;
