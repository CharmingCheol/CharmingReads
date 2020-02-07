import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { LogInForm, LogInMain } from "./style";
import { useInput } from "../SignUp";
import { LOG_IN_REQUEST } from "../../redux/actions/userAction";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  const onLogInSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          usrId: id,
          password
        }
      });
    },
    [id, password]
  );

  return (
    <>
      <LogInMain>
        <LogInForm onSubmit={onLogInSubmit}>
          <input placeholder="아이디" onClick={onChangeId} required />
          <input
            type="password"
            placeholder="비밀번호"
            onClick={onChangePassword}
            required
          />
          <button>로그인</button>
        </LogInForm>
        <button>카카오톡 로그인</button>
        <button>구글 로그인</button>
      </LogInMain>
    </>
  );
};

export default LoginForm;
