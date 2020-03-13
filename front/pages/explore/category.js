import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
import styled from "styled-components";

import { LOAD_CATEGORY_POSTS_REQUEST } from "../../redux/actions/postAction";
import CategoryBook from "../../Components/Category";

const Category_Section = styled.div`
  & div:first-child {
    & h3 {
      margin-bottom: 10px;
    }
    margin-bottom: 30px;
  }
`;

const Categoty_Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  & div {
    margin: 0 auto;
    & img {
      width: 25vw;
      height: 30vw;
      margin-bottom: 10px;
    }
  }
`;

const Category = ({ word }) => {
  const { mainPosts, hasMoreCategoryPosts } = useSelector(
    state => state.postReducer
  );
  const dispatch = useDispatch();

  const onScrollPosts = useCallback(() => {
    if (pageYOffset >= 500) {
      if (hasMoreCategoryPosts) {
        dispatch({
          type: LOAD_CATEGORY_POSTS_REQUEST,
          data: {
            word,
            lastId: mainPosts[mainPosts.length - 1].id
          }
        });
      }
    }
  }, [mainPosts, hasMoreCategoryPosts]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollPosts);
    return () => {
      window.removeEventListener("scroll", onScrollPosts);
    };
  }, [mainPosts, hasMoreCategoryPosts]);

  return (
    <>
      <Category_Section>
        <div>
          <h3>{word}</h3>
          <div>게시물 {mainPosts.length}</div>
        </div>
        <div>
          <h3>게시물</h3>
          <Categoty_Grid>
            {mainPosts.map(post => {
              return <CategoryBook key={post.id} post={post} />;
            })}
          </Categoty_Grid>
        </div>
      </Category_Section>
    </>
  );
};

Category.getInitialProps = async context => {
  const word = context.query.word;
  context.store.dispatch({
    type: LOAD_CATEGORY_POSTS_REQUEST,
    data: {
      word
    }
  });
  return { word };
};

export default Category;
