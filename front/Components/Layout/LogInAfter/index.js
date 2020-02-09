import React, { useCallback } from "react";
import { LogInAfterLayout, LogInAfterImage, LogInAfterButton } from "./style";
import { useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../../../redux/actions/userAction";

const LogInAfter = () => {
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
          <div>xxx님 안녕하세요</div>
          <LogInAfterButton onClick={onClickLogout}>로그아웃</LogInAfterButton>
        </div>
        <LogInAfterImage />
      </LogInAfterLayout>
    </>
  );
};

export default LogInAfter;
