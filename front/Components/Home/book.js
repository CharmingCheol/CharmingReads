import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import {
  POST_LIKE_REQUEST,
  POST_LIKE_REMOVE_REQUEST,
  ADD_COMMENT_REQUEST
} from "../../redux/actions/postAction";
import { useInput } from "../SignUp";

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
  & div:first-child {
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

const RedHeart = styled.i`
  color: red;
`;

const Book = ({ post }) => {
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const liked = me.id && post.Like && post.Like.find(like => like.id === me.id);
  const [star, onChangeStar] = useState(0);
  const [comment, onChangeComment] = useState("");
  const [submitDisable, onSubmitDisable] = useState(true);

  const openModal = useCallback(() => {
    const modal = document.querySelector(".modal");
    modal.style.display = "block";
  }, []);

  const cancelModal = useCallback(() => {
    const modal = document.querySelector(".modal");
    modal.style.display = "none";
  }, []);

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

  return (
    <>
      <div>
        <Image src={`http://localhost:3001/${post.src}`} onClick={openModal} />
        <div>{post.title}</div>
        <Modal className="modal">
          <div className="modal-content">
            <span className="close" onClick={cancelModal}>
              X
            </span>
            <div>
              <header>
                <img /> {/*작성자 이미지 */}
                <article>작성자 이름</article>
                <article>작성일</article>
              </header>
              <section>
                <img /> {/*책 이미지 */}
                <article>해시태그</article>
                <article>{`좋아요 수 : ${post.Like.length}`}</article>
                <article>댓글 수</article>
                <article>평점</article>
              </section>
            </div>
            <section>
              <article>책 후기</article>
              <ul>
                <li onClick={onClickLike}>
                  {liked ? (
                    <RedHeart className="fas fa-heart"></RedHeart>
                  ) : (
                    <i className="far fa-heart"></i>
                  )}
                </li>
                <li>댓글 펼치기</li>
                <li>글 저장</li>
              </ul>
              <footer>
                <form onSubmit={onSubmitComment}>
                  <img /> {/*유저 이미지 */}
                  <div onChange={onChangeDisabled}>
                    <input onChange={commentInput} />
                    <StarRatings
                      rating={star}
                      starRatedColor="blue"
                      changeRating={changeRating}
                      numberOfStars={5}
                      name="rating"
                    />
                  </div>
                  <button disabled={submitDisable}>댓글 작성 버튼</button>
                </form>
              </footer>
            </section>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Book;
