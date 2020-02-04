import React from "react";

import GlobalStyles from "../GlobalStyle";
import { Menu, Main } from "./style";
import Search from "./Search";
import LogInBefore from "./LogInBefore";
import LogInAfter from "./LogInAfter";

const AppLayout = ({ children }) => {
  const check = true;
  return (
    <>
      <GlobalStyles />
      <Menu>
        <div>로고 영역</div>
        <Search />
        {check ? <LogInBefore /> : <LogInAfter />}
      </Menu>
      <Main>{children}</Main>
    </>
  );
};

export default AppLayout;
