import React, { useState, useCallback, useEffect } from "react";
import Router from "next/router";
import { SignUpMain, Message } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../redux/actions/userAction";

export const useInput = (initialValue = null) => {
  const [value, setter] = useState(initialValue);
  const setValue = useCallback(event => {
    setter(event.target.value);
  }, []);
  return [value, setValue];
};

const SignUpForm = () => {
  const [id, onChangeId] = useInput("");
  const [nickName, onChangeNickName] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [confirmPassword, setChangeConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const { signUpErrorMessage, me, signUpFail } = useSelector(
    state => state.userReducer
  );

  const onChangeConfirmPassword = useCallback(
    event => {
      setChangeConfirmPassword(event.target.value);
      setErrorMessage(password !== event.target.value);
    },
    [password, confirmPassword]
  );

  const onChangeCheck = useCallback(event => {
    setCheck(event.target.checked);
  }, []);

  const onSubmitSignUp = useCallback(
    event => {
      event.preventDefault();
      if (password !== confirmPassword) {
        return setErrorMessage(true);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { userId: id, nickName, password }
      });
    },
    [id, nickName, password, confirmPassword]
  );

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <>
      <SignUpMain onSubmit={onSubmitSignUp}>
        <input placeholder="아이디" onChange={onChangeId} required />
        <input placeholder="이름" onChange={onChangeNickName} required />
        <input
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
          required
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          onChange={onChangeConfirmPassword}
          required
        />
        <div>
          <input
            type="checkbox"
            id="signUpCheck"
            onChange={onChangeCheck}
            required
          />
          <label htmlFor="signUpCheck">회원가입 체크하기</label>
        </div>
        {errorMessage && <Message>비밀번호가 일치하지 않습니다</Message>}
        {signUpFail && <Message>{signUpErrorMessage}</Message>}
        <button>가입하기</button>
      </SignUpMain>
    </>
  );
};

export default SignUpForm;
