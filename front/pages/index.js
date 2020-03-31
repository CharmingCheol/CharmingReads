import React, { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  LOAD_POSTS_REQUEST,
  LOAD_TOP_RATED_LIKE_POSTS_REQUEST,
  LOAD_TOP_RATED_COMMENT_POSTS_REQUEST,
  LOAD_ALL_POSTS_REQUEST
} from "../redux/actions/postAction";
import Book from "../Components/Home/BookImage";

const Books_Layout_Title = styled.h3`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 1.4rem;
  text-align: center;
`;

const Books_Layout = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Home = () => {
  const { me } = useSelector(state => state.userReducer);
  const {
    mainPosts,
    mostLikePosts,
    mostCommentPosts,
    allPosts,
    hasMoreAllPosts
  } = useSelector(state => state.postReducer);
  const dispatch = useDispatch();
  const countLastId = useRef([]);

  const scrollPosts = useCallback(() => {
    if (document.body.offsetHeight - window.innerHeight - pageYOffset <= 850) {
      if (hasMoreAllPosts) {
        const lastId = allPosts[allPosts.length - 1].id;
        if (!countLastId.current.includes(lastId)) {
          dispatch({
            type: LOAD_ALL_POSTS_REQUEST,
            data: { lastId }
          });
          countLastId.current.push(lastId);
        }
      }
    }
  }, [hasMoreAllPosts]);

  useEffect(() => {
    window.addEventListener("scroll", scrollPosts);
    return () => {
      window.removeEventListener("scroll", scrollPosts);
    };
  }, [hasMoreAllPosts]);

  return (
    <>
      {me ? (
        <div>
          <Books_Layout_Title>내가 쓴 최신글</Books_Layout_Title>
          <Books_Layout>
            {mainPosts.map(post => {
              return <Book key={post.id} post={post} />;
            })}
          </Books_Layout>
        </div>
      ) : null}
      <div>
        <Books_Layout_Title>좋아요 TOP10 게시글</Books_Layout_Title>
        <Books_Layout>
          {mostLikePosts.map(post => {
            return <Book key={post.id + 0.1} post={post} />;
          })}
        </Books_Layout>
      </div>
      <Books_Layout_Title>댓글 TOP10 게시글</Books_Layout_Title>
      <div>
        <Books_Layout>
          {mostCommentPosts.map(post => {
            return <Book key={post.id + 0.2} post={post} />;
          })}
        </Books_Layout>
      </div>
      <div>
        <Books_Layout_Title>모두 보기</Books_Layout_Title>
        <Books_Layout>
          {allPosts.map(post => {
            return <Book key={post.id + 0.3} post={post} all="all" />;
          })}
        </Books_Layout>
      </div>
    </>
  );
};

Home.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_POSTS_REQUEST
  });
  context.store.dispatch({
    type: LOAD_TOP_RATED_LIKE_POSTS_REQUEST
  });
  context.store.dispatch({
    type: LOAD_TOP_RATED_COMMENT_POSTS_REQUEST
  });
  context.store.dispatch({
    type: LOAD_ALL_POSTS_REQUEST,
    data: {
      lastId: 99999999
    }
  });
};

export default Home;
