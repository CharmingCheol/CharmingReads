import React, { useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useInput } from "../Components/SignUp";
import { USER_EDIT_REQUEST } from "../redux/actions/userAction";

const UserEdit_Form = styled.form`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;
    & label {
      margin-right: 10px;
    }
    & input {
      width: 25em;
      border: 0.1em solid black;
      padding: 1em;
    }
  }
  & button {
    padding: 1em;
    margin-bottom: 30px;
  }
`;

const UserEdit_Image = styled.div`
  border: 1px solid black;
  padding: 50px;
  background: red;
`;

const UserEdit = () => {
  const dispatch = useDispatch();
  const { me } = useSelector(state => state.userReducer);

  const [editnickName, onEditnickName] = useInput();
  const [editId, onEditId] = useInput();
  const [editPassword, onEditPassword] = useInput();
  const [editText, onEditText] = useInput();

  const onSubmitEdit = useCallback(
    event => {
      event.preventDefault();
      dispatch({
        type: USER_EDIT_REQUEST,
        data: {
          userId: editId,
          nickName: editnickName,
          password: editPassword,
          introduction: editText
        }
      });
    },
    [editId, editnickName, editPassword, editText]
  );

  return (
    <>
      <div>
        <UserEdit_Form onSubmit={onSubmitEdit}>
          <UserEdit_Image />
          <div>
            <label>닉네임 변경</label>
            <input
              placeholder={me ? me.nickName : ""}
              onChange={onEditnickName}
            />
          </div>
          <div>
            <label>아이디 변경</label>
            <input placeholder={me ? me.userId : ""} onChange={onEditId} />
          </div>
          <div>
            <label>비밀번호 변경</label>
            <input type="password" onChange={onEditPassword} />
          </div>
          <div>
            <label>소개글 변경</label>
            <input placeholder={me ? me.nickName : ""} onChange={onEditText} />
          </div>
          <button>저장</button>
        </UserEdit_Form>
      </div>
    </>
  );
};

export default UserEdit;
