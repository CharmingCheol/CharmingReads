import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import {
  POST_LIKE_REQUEST,
  POST_LIKE_REMOVE_REQUEST,
  ADD_COMMENT_REQUEST,
  LOAD_COMMENTS_REQUEST
} from "../../redux/actions/postAction";
import { ADD_POST_STORAGE_REQUEST } from "../../redux/actions/userAction";
import Comment from "./comment";
import BookModal from "../../pages/bookModal";
import Link from "next/link";

const Image = styled.img`
  width: 10vw;
  height: 15vw;
  margin: 20px 0 5px 0;
`;

const Modal = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  /*overflow: auto;  Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  & section {
    background-color: #fefefe;
    margin: 5% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    height: 80%;
    & span {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
    & span:hover,
    & span:focus {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }
  }
`;

const ModalLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const ModalTabMenu = styled.div`
  position: relative;
`;

const ModalCommentList = styled.div`
  width: 100%;
  height: 400%;
  padding: 5px;
  word-break: break-word;
  position: absolute;
  border: solid #000000 1px;
  background: white;
  z-index: 10;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const RedHeart = styled.i`
  color: red;
`;

const Book = ({ post }) => {
  const { me, modalInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const liked = me.id && post.Like && post.Like.find(like => like.id === me.id);
  const [star, onChangeStar] = useState(0);
  const [comment, onChangeComment] = useState("");
  const [submitDisable, onSubmitDisable] = useState(true);
  const [commentFormOpened, setCommentFormOpened] = useState(false);

  //modal창 열기
  const openModal = useCallback(() => {
    // const modal = document.querySelector(".modal");
    // modal.style.display = "block";
  }, []);

  //modal창 닫기
  const cancelModal = useCallback(() => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }, []);

  //좋아요 버튼 클릭
  const onClickLike = useCallback(() => {
    if (liked) {
      dispatch({
        type: POST_LIKE_REMOVE_REQUEST,
        data: {
          postId: post.id
        }
      });
    } else {
      dispatch({
        type: POST_LIKE_REQUEST,
        data: {
          postId: post.id
        }
      });
    }
  }, [liked, post && post.id]);

  //댓글 인풋 값 변경
  const commentInput = useCallback(event => {
    onChangeComment(event.target.value);
  }, []);

  //레이팅 바
  const changeRating = useCallback(rating => {
    onChangeStar(rating);
  }, []);

  //댓글 달기 버튼 비활성화 해제
  const onChangeDisabled = useCallback(() => {
    if (!comment || !comment.trim() || !star) {
      return onSubmitDisable(true);
    } else {
      return onSubmitDisable(false);
    }
  }, [comment, star]);

  //댓글 달기 전송
  const onSubmitComment = useCallback(
    event => {
      event.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          comment,
          star,
          postId: post.id
        }
      });
      onSubmitDisable(true);
      onChangeStar(0);
      onChangeComment("");
    },
    [comment, star, post && post.id]
  );

  //댓글 창 열기
  const onToggleComment = useCallback(() => {
    setCommentFormOpened(prev => !prev);
    if (!commentFormOpened) {
      dispatch({
        type: LOAD_COMMENTS_REQUEST,
        data: {
          postId: post.id
        }
      });
    }
  }, [commentFormOpened, post && post.id]);

  //게시글 저장
  const onClickPostStorage = useCallback(() => {
    // dispatch({
    //   type: ADD_POST_STORAGE_REQUEST,
    //   data: {
    //     postId: post.id
    //   }
    // });
  }, []);

  return (
    <>
      <div>
        <Link
          href={{ pathname: "/bookModal", query: { id: post.id } }}
          as={`${post.id}`}
        >
          <a>
            <Image
              src={`http://localhost:3001/${post.src}`}
              onClick={openModal}
            />
            <div>{post.title}</div>
          </a>
        </Link>
        {/* {modalInfo ? <BookModal className="modal" post={modalInfo} /> : null} */}
      </div>
    </>
  );
};

export default Book;
