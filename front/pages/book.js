import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  POST_LIKE_REQUEST,
  POST_LIKE_REMOVE_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LOAD_MODAL_POST_REQUEST,
  REMOVE_POST_STORAGE_REQUEST,
  ADD_POST_STORAGE_REQUEST
} from "../redux/actions/postAction";
import {
  BookModaLayout,
  BookModalTabMenu,
  ModalCommentList
} from "../Components/Home/style";
import CommentInput from "../Components/Home/CommentInput";
import Comment from "../Components/Home/Comment";

const Book = ({ id }) => {
  const { modalPost } = useSelector(state => state.postReducer);
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const liked =
    me && modalPost.Like
      ? modalPost.Like.find(like => like.id === me.id)
      : null;
  const stored =
    me && me.PostStorages
      ? me.PostStorages.find(post => post.postId === id)
      : null;

  //좋아요 버튼
  const onClickLike = useCallback(() => {
    if (liked) {
      dispatch({
        type: POST_LIKE_REMOVE_REQUEST,
        data: {
          postId: id
        }
      });
    } else {
      dispatch({
        type: POST_LIKE_REQUEST,
        data: {
          postId: id
        }
      });
    }
  }, [liked, id]);

  //댓글 창 열기
  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {
          postId: id
        }
      });
    }
  }, [commentFormOpened, id]);

  //게시글 토글
  const onClickPostStorage = useCallback(() => {
    if (stored) {
      dispatch({
        type: REMOVE_POST_STORAGE_REQUEST,
        data: id
      });
    } else {
      dispatch({
        type: ADD_POST_STORAGE_REQUEST,
        data: {
          postId: id
        }
      });
    }
  }, [stored, id]);

  return (
    <>
      {modalPost ? (
        <BookModaLayout>
          <section>
            <header>
              <div>{modalPost ? modalPost.title : null}</div>
              <img
                src={
                  me && me.src
                    ? `http://localhost:3001/${me.src}`
                    : `http://localhost:3001/기본이미지.png`
                }
              />
              <article>{me.nickName}</article>
              <article>작성일</article>
            </header>
            <BookModalTabMenu>
              <ul>
                <li onClick={onClickLike}>
                  {liked ? (
                    <i className="fas fa-heart"></i>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </li>
                <li onClick={onToggleComment}>
                  <i className="fas fa-comment"></i>
                </li>
                <li onClick={onClickPostStorage}>
                  {stored ? (
                    <i className="fas fa-share-square"></i>
                  ) : (
                    <i className="far fa-share-square"></i>
                  )}
                </li>
              </ul>
              <div>
                <div>{`좋아요 ${
                  modalPost.Like ? modalPost.Like.length : 0
                }`}</div>
                <div>{`댓글 ${
                  modalPost.Comments ? modalPost.Comments.length : 0
                }`}</div>
              </div>
              {commentFormOpened && (
                <>
                  <ModalCommentList>
                    {modalPost.Comments.map(comment => {
                      return comment ? (
                        <Comment key={comment.id} comment={comment} />
                      ) : null;
                    })}
                  </ModalCommentList>
                </>
              )}
            </BookModalTabMenu>
            <footer>
              <CommentInput id={id} />
            </footer>
          </section>
          <section>
            <img
              src={
                modalPost && modalPost.src
                  ? `http://localhost:3001/${modalPost.src}`
                  : `http://localhost:3001/기본이미지.png`
              }
            />
            <div>{modalPost.content}</div>
          </section>
        </BookModaLayout>
      ) : null}
    </>
  );
};

Book.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  context.store.dispatch({
    type: LOAD_MODAL_POST_REQUEST,
    data: id
  });
  return { id };
};

export default Book;
