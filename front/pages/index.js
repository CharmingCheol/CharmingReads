import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  LOAD_POSTS_REQUEST,
  LOAD_FOLLOW_POSTS_REQUEST
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
  const { mainPosts, followPosts } = useSelector(state => state.postReducer);

  const dispatch = useDispatch();
  const onScrollPosts = useCallback(() => {}, []);

  useEffect(() => {
    window.addEventListener("scroll", onScrollPosts);
    return () => {
      window.removeEventListener("scroll", onScrollPosts);
    };
  }, []);

  return (
    <>
      <div>
        <Section_Title>내가 쓴 최신글</Section_Title>
        <Grid>
          {mainPosts
            ? mainPosts.map(post => {
                return <Book key={post.id} post={post} />;
              })
            : null}
        </Grid>
        <div>
          <Section_Title>친구가 작성한 추천 책</Section_Title>
          <Grid>
            {followPosts.map(post => {
              return <Book key={post.id} post={post} />;
            })}
          </Grid>
        </div>
      </div>
    </>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  context.store.dispatch({
    type: LOAD_FOLLOW_POSTS_REQUEST,
    data: {
      lastId: parseInt(0, 10),
      userId: parseInt(0, 10)
    }
  });
};

export default Home;
