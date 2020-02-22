import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { LOAD_POSTS_REQUEST } from "../redux/actions/postAction";
import Book from "../Components/Home/book";
import Homelayout from "../Components/Layout";

const Test = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  z-index: -1;
`;

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
      {/* <Test>
        <Description />
        <Category />
      </Test> */}
      {/* <Test>
        <Description />
        <Category />
      </Test>
      <BookList /> */}
      <div>
        <div>내가 쓴 최신글</div>
        <Grid>
          {mainPosts.map(post => {
            return <Book key={post.id} post={post} />;
          })}
        </Grid>
      </div>
    </>
  );
};

export default Home;
