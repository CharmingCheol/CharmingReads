import React from "react";

import GlobalStyles from "../GlobalStyle";
import Description from "./Description";
import Category from "./Category";
import Search from "./Search";
import SignMenu from "./SignMenu";
import { Layout, Menu } from "./style";

const AppLayout = ({ children }) => {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Menu>
          <div>로고 영역</div>
          <SignMenu />
        </Menu>
        <Description />
        <Category />
        <Search />
      </Layout>
      <div>{children}</div>
    </>
  );
};

export default AppLayout;
