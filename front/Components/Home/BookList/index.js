import React from "react";
import { useSelector } from "react-redux";

import Book from "../Book";
import { BookList_List, BookList_Section, BookList_Title } from "./style";

const BookList = () => {
  const { mainPosts } = useSelector(state => state.postReducer);
  return (
    <>
      <BookList_Section>
        <BookList_Title>내가 쓴 글</BookList_Title>
        <BookList_List>
          {mainPosts.map(post => {
            return <Book key={post} post={post} />;
          })}
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
