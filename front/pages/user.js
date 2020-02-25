import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import {
  LOAD_USER_DETAIL_REQUEST,
  FOLLOW_REQUEST
} from "../redux/actions/userAction";

export const User_Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const User_Info = styled.div`
  display: flex;
  margin-bottom: 50px;
  & img {
    width: 10vw;
    height: 10vw;
    background-color: red;
  }
`;

export const User_Info_Section = styled.div`
  & div {
    margin: 0 0 1.5rem 0.5rem;
  }
  & button {
    width: 100px;
    height: 40px;
    margin-right: 1vw;
    font-weight: 600;
    background-color: #ecf0f1;
    box-shadow: none;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 10px;
    z-index: -10;
  }
`;

export const User_Info_Friends = styled.div`
  display: flex;
  margin: 0 0 25px 0;
  & div {
    margin-right: 25px;
  }
`;

export const User_Inrtoduce = styled.div`
  font-size: 1rem;
  & div:first-child {
    margin-bottom: 1.5em;
  }
`;

export const User_Tab_Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const User_Tab = styled.button`
  font-size: 1rem;
  background-color: #ecf0f1;
  border: 1px solid rgb(198, 201, 207);
  height: 50px;
`;

export const User_Post_Image = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: center;
  justify-content: center;
  & div {
    width: auto;
    height: 16vw;
    background-color: red;
    padding: 1vw;
  }
`;

const User = ({ id }) => {
  const { me, userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const followed =
    me && userInfo ? userInfo.Follower.find(user => user.id === me.id) : null;

  //팔로우 토글
  const followToggle = useCallback(() => {
    if (followed) {
      console.log("asd");
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: { userId: me.id, postId: id }
      });
    }
  }, [followed, me && me.id]);
  console.log(userInfo);
  console.log(me);

  return (
    <>
      <User_Section>
        <div>
          <User_Info>
            <img />
            <User_Info_Section>
              <div>
                <div>{userInfo ? userInfo.nickName : null}</div>
                {me && userInfo && me.id === userInfo.id ? (
                  <>
                    <Link href="/post">
                      <button>게시글 추가</button>
                    </Link>
                    <Link href="/userEdit">
                      <button>프로필 편집</button>
                    </Link>
                  </>
                ) : me ? (
                  <button onClick={followToggle}>팔로우</button>
                ) : null}
              </div>
              <User_Info_Friends>
                <div>게시글 xxxx</div>
                <div>팔로우 xxxx</div>
                <div>팔로잉 xxxx</div>
              </User_Info_Friends>
            </User_Info_Section>
          </User_Info>
          <User_Inrtoduce>
            <div>
              {userInfo && userInfo.introduction
                ? userInfo.introduction
                : "소개글이 없습니다"}
            </div>
          </User_Inrtoduce>
        </div>
      </User_Section>
    </>
  );
};

User.getInitialProps = async context => {
  const id = parseInt(context.query.id, 10);
  context.store.dispatch({
    type: LOAD_USER_DETAIL_REQUEST,
    data: id
  });
  return { id };
};

export default User;
