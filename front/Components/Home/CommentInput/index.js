import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import StarRatings from "react-star-ratings";
import { ADD_COMMENT_REQUEST } from "../../../redux/actions/postAction";

const CommentInput = ({ id }) => {
  const dispatch = useDispatch();
  const [star, onChangeStar] = useState(0);
  const [comment, onChangeComment] = useState("");
  const [submitDisable, onSubmitDisable] = useState(true);

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
          postId: id
        }
      });
      onSubmitDisable(true);
      onChangeStar(0);
      onChangeComment("");
    },
    [comment, star, id]
  );

  return (
    <>
      <form onSubmit={onSubmitComment}>
        <img />
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
    </>
  );
};

export default CommentInput;
