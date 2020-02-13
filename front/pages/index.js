import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import { LOAD_POSTS_REQUEST } from "../redux/actions/postAction";
import Book from "../Components/Home/book";

const Test = styled.div`
  position: absolute;
  width: 100vw;
  left: 0;
  z-index: -1;
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
        <div>
          <div>내가 쓴 글</div>
          <div>
            {mainPosts.map(post => {
              return <Book key={post.id} post={post} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
