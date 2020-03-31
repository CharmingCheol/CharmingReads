import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

import GlobalStyles from "../GlobalStyle";
import { Menu, Main } from "./style";
import Search from "./Search";
import LogInBefore from "./LogInBefore";
import LogInAfter from "./LogInAfter";
import Description from "../Home/Description";
import Category from "../Home/Category";

const AppLayout = ({ children, pathname }) => {
  const { me } = useSelector(state => state.userReducer);
  return (
    <>
      <GlobalStyles />
      <Menu>
        <Link href="/">
          <i className="fas fa-book-open"></i>
        </Link>
        <Search />
        {me ? <LogInAfter /> : <LogInBefore />}
      </Menu>
      {pathname === "/" ? (
        <div>
          <Description />
          <Category />
        </div>
      ) : null}
      <Main>{children}</Main>
    </>
  );
};

export default AppLayout;
