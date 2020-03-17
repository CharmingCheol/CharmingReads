import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { LOAD_POSTS_REQUEST } from "../redux/actions/postAction";
import Book from "../Components/Home/BookImage";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin: 10px 0 10px 0;
`;

const Home = () => {
  const { me } = useSelector(state => state.userReducer);
  const { mainPosts } = useSelector(state => state.postReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (me) {
      dispatch({
        type: LOAD_POSTS_REQUEST
      });
    }
  }, [me && me.id]);

  return (
    <>
      <div>
        <h3>내가 쓴 최신글</h3>
        <Grid>
          {mainPosts
            ? mainPosts.map(post => {
                return <Book key={post.id} post={post} />;
              })
            : null}
        </Grid>
        <div>
          <h3>친구가 작성한 추천 책</h3>
        </div>
      </div>
    </>
  );
};

export default Home;
