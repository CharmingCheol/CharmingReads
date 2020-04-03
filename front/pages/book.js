import React, { useCallback, useEffect, useRef } from "react";
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
  const { modalPost, hasMoreComments } = useSelector(
    state => state.postReducer
  );
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const liked =
    me &&
    modalPost &&
    modalPost.Like &&
    modalPost.Like.find(like => like.id === me.id);
  const stored =
    me && me.PostStorages && me.PostStorages.find(post => post.postId === id);
  const Comments = useRef();

  //좋아요 버튼
  const onClickLike = useCallback(() => {
    if (liked) {
      dispatch({
        type: POST_LIKE_REMOVE_REQUEST,
        data: {
          postId: id,
          likeCount: modalPost.likeCount
        }
      });
    } else {
      dispatch({
        type: POST_LIKE_REQUEST,
        data: {
          postId: id,
          likeCount: modalPost.likeCount
        }
      });
    }
  }, [liked, modalPost && modalPost.likeCount]);

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
  }, [stored]);

  const loadComments = useCallback(
    e => {
      const { clientHeight, scrollHeight, scrollTop } = e.target;
      if (150 > scrollHeight - clientHeight - scrollTop) {
        if (hasMoreComments) {
          dispatch({
            type: LOAD_COMMENTS_REQUEST,
            data: {
              postId: id,
              lastId: modalPost.Comments[modalPost.Comments.length - 1].id
            }
          });
        }
      }
    },
    [
      hasMoreComments
      // modalPost.Comments && modalPost.Comments[modalPost.Comments.length - 1].id
    ]
  );

  // useEffect(() => {
  //   Comments.current.onscroll = loadComments;
  //   return () => {
  //     Comments.current.onscroll = null;
  //   };
  // }, [
  //   hasMoreComments
  //   // modalPost.Comments && modalPost.Comments[modalPost.Comments.length - 1].id
  // ]);
  // console.log(modalPost);
  // // console.log(modalPost.createdAt.slice(0, 16).replace("T", " "));

  console.log(modalPost);
  return (
    <>
      <Book_Layout>
        <div className="Flex-Section First">
          <Book_User_Info profileSrc={modalPost.User.src}>
            {/* <Link
              href={{
                pathname: "/user",
                query: { id: modalPost.UserId }
              }}
              as={`/user/${modalPost.UserId}`}
            >
              <a>
                <figure></figure>
              </a>
            </Link> */}
            <div>
              <h3>{modalPost.User.nickName}</h3>
              <h3>
                {modalPost.createdAt &&
                  modalPost.createdAt.slice(0, 16).replace("T", " ")}
              </h3>
              <h3>카테고리: {modalPost.category}</h3>
            </div>
          </Book_User_Info>
          {/* <Book_Main postSrc={modalPost.src}>
            <h3>제목 : {modalPost.title}</h3>
            <figure />
            {me ? (
              <Book_Comment_Menu>
                <li onClick={onClickLike}>
                  {liked ? (
                    <i
                      className="fas fa-heart"
                      style={{ color: "crimson" }}
                    ></i>
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
            ) : null}
            <h3>{`좋아요 ${modalPost.likeCount}`}</h3>
            <CommentInput id={id} commentCount={modalPost.commentCount} />
          </Book_Main> */}
        </div>
        {/* <div className="Flex-Section Second" ref={Comments}>
          <div className="Second-A">
            <h2>감상평</h2>
            <h3 className="Book-Detail-Content">{modalPost.content}</h3>
          </div>
          <Book_Comment_List>
            {modalPost.Comments &&
              modalPost.Comments.map(comment => {
                return <Comment key={comment.id} comment={comment} />;
              })}
          </Book_Comment_List>
        </div>  */}
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
  return { id };
};

export default Book;
