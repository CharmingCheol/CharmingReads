import React, { useCallback, useEffect } from "react";
import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { LogInForm, LogInMain } from "./style";
import { useInput } from "../SignUp";
import { LOG_IN_REQUEST, KAKAO_REQUEST } from "../../redux/actions/userAction";
import Link from "next/link";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  console.log(me);

  const onLogInSubmit = useCallback(
    event => {
      event.preventDefault();
      dispatch({
        type: LOG_IN_REQUEST,
        data: {
          userId: id,
          password
        }
      });
    },
    [id, password]
  );

  const onKakaoLogin = useCallback(() => {
    Router.push("/auth/kakao");
    dispatch({
      type: KAKAO_REQUEST
    });
  }, []);

  useEffect(() => {
    if (me) {
      Router.push("/");
    }
  }, [me && me.id]);

  return (
    <>
      <LogInMain>
        <LogInForm onSubmit={onLogInSubmit}>
          <input placeholder="아이디" onChange={onChangeId} required />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
            required
          />
          <button>로그인</button>
        </LogInForm>
        <button onClick={onKakaoLogin}>카카오톡 로그인</button>
        <button>구글 로그인</button>
      </LogInMain>
    </>
  );
};

export default LoginForm;
