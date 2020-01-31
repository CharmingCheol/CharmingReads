import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { LogInForm, LogInMain } from "./style";
import { useInput } from "../SignUp";

const LoginForm = () => {
  const [id, onChangeId] = useInput("");
  const [password, onChangePassword] = useInput("");
  const router = useRouter();

  const onLogInSubmit = useCallback(() => {
    return router.push("/");
  }, []);
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
