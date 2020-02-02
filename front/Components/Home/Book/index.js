import React from "react";
import { Home_Book_Image, Home_Book } from "./style";

const Book = () => {
  return (
    <>
      <Home_Book>
        <Home_Book_Image />
        <div>책이름</div>
        <div>저자</div>
      </Home_Book>
      <Home_Book>
        <Home_Book_Image />
        <div>책이름</div>
        <div>저자</div>
      </Home_Book>
      <Home_Book>
        <Home_Book_Image />
        <div>책이름</div>
        <div>저자</div>
      </Home_Book>
    </>
  );
};

export default Book;
