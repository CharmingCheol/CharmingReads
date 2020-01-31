import React from "react";
import SignMenu from "../AppLayout/SignMenu";
import GlobalStyles from "../GlobalStyle";
import { Layout, Main } from "./style";

const SignLayout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <div>로고 영역</div>
        <SignMenu />
      </Layout>
      <Main>{children}</Main>
    </>
  );
};

export default SignLayout;
