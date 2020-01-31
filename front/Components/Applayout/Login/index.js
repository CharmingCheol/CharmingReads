import React from "react";
import { Content } from "./style";

const Login = () => {
  return (
    <>
      <Content>
        <div>
          <input placeholder="아이디" />
          <input placeholder="비밀번호" />
        </div>
        <button>로그인</button>
        <button>카카오톡</button>
        <button>구글</button>
      </Content>
    </>
  );
};

export default Login;
