const Category = () => {
  return (
    <>
      <div>a</div>
    </>
  );
};

Category.getInitialProps = async context => {
  const word = parseInt(context.query.word, 10);
  //   context.store.dispatch({
  //     type: LOAD_MODAL_POST_REQUEST,
  //     data: word
  //   });
  return { word };
};

export default Category;
