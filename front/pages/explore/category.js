import styled from "styled-components";
import { useSelector } from "react-redux";
import { LOAD_CATEGORY_POSTS_REQUEST } from "../../redux/actions/postAction";
import Book from "../../Components/Home/BookImage";

const Category_Section = styled.div`
  & div:first-child {
    & h3 {
      margin-bottom: 10px;
    }
    margin-bottom: 30px;
  }
`;

const Category = ({ word }) => {
  const { mainPosts } = useSelector(state => state.postReducer);
  return (
    <>
      <Category_Section>
        <div>
          <h3>{word}</h3>
          <div>게시물 {mainPosts.length}</div>
        </div>
        <div>
          <h3>게시물</h3>
          {mainPosts.map(post => (
            <Book key={post.id} post={post} />
          ))}
        </div>
      </Category_Section>
    </>
  );
};

Category.getInitialProps = async context => {
  const word = context.query.word;
  context.store.dispatch({
    type: LOAD_CATEGORY_POSTS_REQUEST,
    data: word
  });
  return { word };
};

export default Category;
