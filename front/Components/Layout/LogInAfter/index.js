import React from "react";
import { LogInAfterLayout, LogInAfterImage, LogInAfterButton } from "./style";

const LogInAfter = () => {
  return (
    <>
      <LogInAfterLayout>
        <div>
          <div>xxx님 안녕하세요</div>
          <LogInAfterButton>로그아웃</LogInAfterButton>
        </div>
        <LogInAfterImage />
      </LogInAfterLayout>
    </>
  );
};

export default LogInAfter;
