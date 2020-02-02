import React from "react";
import Book from "../Book";
import { BookList_List, BookList_Section, BookList_Title } from "./style";

const BookList = () => {
  return (
    <>
      <BookList_Section>
        <BookList_Title>내가 쓴 글</BookList_Title>
        <BookList_List>
          <Book />
        </BookList_List>
        <BookList_Title>내가 쓴 글</BookList_Title>
        <BookList_List>
          <Book />
        </BookList_List>
        <BookList_Title>내가 쓴 글</BookList_Title>
        <BookList_List>
          <Book />
        </BookList_List>
      </BookList_Section>
    </>
  );
};

export default BookList;
