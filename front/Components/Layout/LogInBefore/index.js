import React from "react";
import { Menu } from "./style";
import Link from "next/link";

const SignMenu = () => {
  return (
    <Menu>
      <li>
        <Link href="/logIn">
          <a>로그인</a>
        </Link>
      </li>
      <li>
        <Link href="/signUp">
          <a>회원가입</a>
        </Link>
      </li>
    </Menu>
  );
};

export default SignMenu;
