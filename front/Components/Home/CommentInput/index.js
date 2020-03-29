import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../../redux/actions/postAction";
import { Comment_Form } from "./style";

const CommentInput = ({ id, commentCount }) => {
  const dispatch = useDispatch();
  const [comment, onChangeComment] = useState("");
  const [submitDisable, onSubmitDisable] = useState(true);

  //댓글 인풋 값 변경
  const commentInput = useCallback(event => {
    onChangeComment(event.target.value);
  }, []);

  //댓글 달기 버튼 비활성화 해제
  const onChangeDisabled = useCallback(() => {
    if (!comment || !comment.trim()) {
      return onSubmitDisable(true);
    } else {
      return onSubmitDisable(false);
    }
  }, [comment]);

  //댓글 달기 전송
  const onSubmitComment = useCallback(
    event => {
      event.preventDefault();
      dispatch({
        type: ADD_COMMENT_REQUEST,
        data: {
          comment,
          postId: id,
          commentCount
        }
      });
      onSubmitDisable(true);
      onChangeComment("");
    },
    [comment, id]
  );

  return (
    <>
      <Comment_Form onChange={onChangeDisabled} onSubmit={onSubmitComment}>
        <textarea placeholder="댓글 달기..." onChange={commentInput} />
        <button disabled={submitDisable}>게시</button>
      </Comment_Form>
    </>
  );
};

export default CommentInput;
