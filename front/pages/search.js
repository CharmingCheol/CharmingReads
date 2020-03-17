import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { LOAD_SEARCH_POSTS_REQUEST } from "../redux/actions/postAction";
import { Categoty_Grid } from "../Components/Category/style";
import CategoryBook from "../Components/Category";

const Search = ({ word }) => {
  const dispatch = useDispatch();
  const { mainPosts, hasMoreSearchPosts } = useSelector(
    state => state.postReducer
  );

  console.log(hasMoreSearchPosts, mainPosts[mainPosts.length - 1].id);

  const onScrollPosts = useCallback(() => {
    if (pageYOffset >= 600) {
      if (hasMoreSearchPosts) {
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          data: {
            word,
            lastId: mainPosts[mainPosts.length - 1].id
          }
        });
      }
    }
  }, [word, hasMoreSearchPosts, mainPosts]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollPosts);
    return () => {
      window.removeEventListener("scroll", onScrollPosts);
    };
  }, [word, hasMoreSearchPosts, mainPosts]);
  return (
    <>
      <h3>{word}</h3>
      <Categoty_Grid>
        {mainPosts.map(post => {
          return <CategoryBook key={post.id} post={post} />;
        })}
      </Categoty_Grid>
    </>
  );
};

Search.getInitialProps = async context => {
  const word = context.query.word;
  context.store.dispatch({
    type: LOAD_SEARCH_POSTS_REQUEST,
    data: { word }
  });
  return { word };
};

export default Search;
