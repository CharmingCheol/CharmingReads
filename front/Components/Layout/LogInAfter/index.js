import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { LogInAfterLayout, LogInAfterImage, LogInAfterButton } from "./style";
import { LOG_OUT_REQUEST } from "../../../redux/actions/userAction";

const LogInAfter = () => {
  const { me } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const onClickLogout = useCallback(() => {
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);

  return (
    <>
      <LogInAfterLayout>
        <div>
          <div>{`${me.nickName}님 안녕하세요`}</div>
          <LogInAfterButton onClick={onClickLogout}>로그아웃</LogInAfterButton>
        </div>
        <Link
          href={{ pathname: "/user", query: { id: me.id } }}
          as={`/user/${me.id}`}
        >
          <a>
            <LogInAfterImage
              src={
                me && me.src
                  ? `http://localhost:3001/${me.src}`
                  : `http://localhost:3001/기본이미지.png`
              }
            />
          </a>
        </Link>
      </LogInAfterLayout>
    </>
  );
};

export default LogInAfter;
