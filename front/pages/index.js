import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  LOAD_POSTS_REQUEST,
  LOAD_TOP_RATED_LIKE_POSTS_REQUEST,
  LOAD_TOP_RATED_COMMENT_POSTS_REQUEST
} from "../redux/actions/postAction";
import Book from "../Components/Home/BookImage";

const Section_Title = styled.h3`
  margin: 1rem 0;
  font-weight: bold;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Home = () => {
  const { me } = useSelector(state => state.userReducer);
  const { mainPosts } = useSelector(state => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_TOP_RATED_LIKE_POSTS_REQUEST
    });
  }, []);

  return (
    <>
      {me ? (
        <div>
          <Section_Title>내가 쓴 최신글</Section_Title>
          <Grid>
            {mainPosts.map(post => {
              return <Book key={post.id} post={post} />;
            })}
          </Grid>
        </div>
      ) : null}
      <div>
        <Section_Title>좋아요 TOP10 게시글</Section_Title>
        <Grid></Grid>
      </div>
    </>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  // context.store.dispatch({
  //   type: LOAD_TOP_RATED_LIKE_POSTS_REQUEST
  // });
  // context.store.dispatch({
  //   type: LOAD_TOP_RATED_COMMENT_POSTS_REQUEST
  // });
};

export default Home;
