import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GlobalStyles from "../GlobalStyle";
import { Menu, Main } from "./style";
import Search from "./Search";
import LogInBefore from "./LogInBefore";
import LogInAfter from "./LogInAfter";

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.userReducer);
  return (
    <>
      <GlobalStyles />
      <Menu>
        <div>로고 영역</div>
        <Search />
        {me ? <LogInAfter /> : <LogInBefore />}
      </Menu>
      <Main>{children}</Main>
    </>
  );
};

export default AppLayout;
