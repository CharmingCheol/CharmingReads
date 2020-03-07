import React from "react";
import styled from "styled-components";

const FollowList = styled.li`
  display: flex;
  align-items: center;
  padding: 20px 20px 10px 20px;
  & img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
`;

const UserFollowList = ({ data }) => {
  return (
    <>
      <FollowList>
        <img
          src={
            data && data.src
              ? `http://localhost:3001/${data.src}`
              : `http://localhost:3001/기본이미지.png`
          }
        />
        <h3>{data.nickName}</h3>
      </FollowList>
    </>
  );
};

export default UserFollowList;
