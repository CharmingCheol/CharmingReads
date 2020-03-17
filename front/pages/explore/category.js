import { useSelector, useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";

import { LOAD_CATEGORY_POSTS_REQUEST } from "../../redux/actions/postAction";
import CategoryBook from "../../Components/Category";
import {
  Category_Section,
  Categoty_Grid
} from "../../Components/Category/style";

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
