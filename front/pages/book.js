import React, { useCallback, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import {
  POST_LIKE_REQUEST,
  POST_LIKE_REMOVE_REQUEST,
  LOAD_COMMENTS_REQUEST,
  LOAD_MODAL_POST_REQUEST,
  REMOVE_POST_STORAGE_REQUEST,
  ADD_POST_STORAGE_REQUEST
} from "../redux/actions/postAction";
import {
  Book_Layout,
  Book_Main,
  Book_User_Info,
  Book_Comment_List,
  Book_Comment_Menu
} from "../Components/Home/style";
import CommentInput from "../Components/Home/CommentInput";
import Comment from "../Components/Home/Comment";

const Book = ({ id }) => {
  const { modalPost } = useSelector(state => state.postReducer);
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const liked =
    me && modalPost.Like && modalPost.Like.find(like => like.id === me.id);
  const stored =
    me && me.PostStorages && me.PostStorages.find(post => post.postId === id);
  const Comments = useRef();

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

  //게시글 저장
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

  const onScrollComments = useCallback(event => {
    console.log(event);
    console.log("gd");
  }, []);

  useEffect(() => {}, []);

  return (
    <>
      <Book_Layout>
        <div className="Flex-Section First">
          <Book_User_Info profileSrc={me.src}>
            <Link
              href={{ pathname: "/user", query: { id: modalPost.UserId } }}
              as={`/user/${modalPost.UserId}`}
            >
              <a>
                <figure></figure>
              </a>
            </Link>
            <div>
              <h3>{me.nickName}</h3>
              <h3>작성일</h3>
            </div>
          </Book_User_Info>
          <Book_Main postSrc={modalPost.src}>
            <h3>제목 : {modalPost.title}</h3>
            <figure />
            <Book_Comment_Menu>
              <li onClick={onClickLike}>
                {liked ? (
                  <i className="fas fa-heart" style={{ color: "crimson" }}></i>
                ) : (
                  <i className="far fa-heart"></i>
                )}
              </li>
              <li onClick={onClickPostStorage}>
                {stored ? (
                  <i className="fas fa-share-square"></i>
                ) : (
                  <i className="far fa-share-square"></i>
                )}
              </li>
            </Book_Comment_Menu>
            <h3>{`좋아요 ${modalPost.Like ? modalPost.Like.length : 0}`}</h3>
            <CommentInput id={id} />
          </Book_Main>
        </div>
        <div className="Flex-Section Second">
          <div className="Second-A">
            <h2>감상평</h2>
            <h3 className="Book-Detail-Content">{modalPost.content}</h3>
          </div>
          <Book_Comment_List onScroll={onScrollComments}>
            {modalPost.Comments &&
              modalPost.Comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />;
              })}
          </Book_Comment_List>
        </div>
      </Book_Layout>
    </>
  );
};

Book.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  context.store.dispatch({
    type: LOAD_MODAL_POST_REQUEST,
    data: id
  });
  context.store.dispatch({
    type: LOAD_COMMENTS_REQUEST,
    data: {
      postId: id
    }
  });
  return { id };
};

export default Book;
