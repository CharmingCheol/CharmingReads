import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import GlobalStyles from "../GlobalStyle";
import { Menu, Main } from "./style";
import Search from "./Search";
import LogInBefore from "./LogInBefore";
import LogInAfter from "./LogInAfter";
import { LOAD_USER_REQUEST } from "../../redux/actions/userAction";

const AppLayout = ({ children }) => {
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!me) {
      dispatch({
        type: LOAD_USER_REQUEST
      });
    }
  }, []);
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
