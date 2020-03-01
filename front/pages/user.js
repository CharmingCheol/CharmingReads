import React, { useCallback, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import styled from "styled-components";
import {
  LOAD_USER_DETAIL_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST
} from "../redux/actions/userAction";
import UserPost from "../Components/User/UserPost";
import UserPopup from "../Components/User/UserPopup";

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
  & article {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
  }
  & article:last-child {
    display: none;
  }
  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    & li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0 20px 0;
    }
  }
`;

const User = ({ id }) => {
  const [popup, setPopup] = useState(null);
  const { me } = useSelector(state => state.userReducer);
  const { userInfo } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const followed =
    me && me.Follow ? me.Follow.find(user => user.id === id) : null;
  const tab01 = useRef();
  const tab02 = useRef();

  //팔로우 토글
  const followToggle = useCallback(() => {
    if (followed) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: { user: id, me: me.id }
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: { user: id, me: me.id }
      });
    }
  }, [followed, me && me.id]);

  //tab 메뉴 변경
  const onClickTab = useCallback(
    event => {
      if (event.target.classList.contains("fa-th")) {
        tab01.current.style = "display:grid";
        tab02.current.style = "display:none";
      } else {
        tab01.current.style = "display:none";
        tab02.current.style = "display:grid";
      }
    },
    [tab01, tab02]
  );

  //팔로워 팝업창 출력
  const FollowerPopup = useCallback(event => {
    console.log(event.target.classList.contains("follow"));
    if (event.target.classList.contains("follow")) {
      setPopup(true);
    } else {
      setPopup(false);
    }
  }, []);

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
                  <button onClick={followToggle}>
                    {followed ? "언팔로우" : "팔로우"}
                  </button>
                ) : null}
              </div>
              <User_Info_Friends>
                <div>{`게시글 ${userInfo ? userInfo.Posts.length : null}`}</div>
                <div className="follower" onClick={FollowerPopup}>{`팔로워 ${
                  userInfo ? userInfo.Follower.length : null
                }`}</div>
                <div className="follow" onClick={FollowerPopup}>{`팔로우 ${
                  userInfo ? userInfo.Follow.length : null
                }`}</div>
              </User_Info_Friends>
              {popup !== null ? (
                popup ? (
                  <UserPopup popup={userInfo.Follow} title="팔로우" />
                ) : (
                  <UserPopup popup={userInfo.Follower} title="팔로워" />
                )
              ) : null}
              {/* <User_Popup ref={popup}>
                <div>팔로워</div>
                <button ref={popupCloseBtn} onClick={popUpClose}>
                  X
                </button>
              </User_Popup> */}
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
        <User_Tab_Section>
          <ul>
            <li onClick={onClickTab}>
              <i className="fas fa-th"></i>
            </li>
            <li onClick={onClickTab}>
              <i className="far fa-bookmark"></i>
            </li>
          </ul>
          <article ref={tab01}>
            {userInfo
              ? userInfo.Posts.map(post => {
                  return <UserPost key={post.id} post={post} />;
                })
              : null}
          </article>
          <article ref={tab02}>
            {userInfo
              ? userInfo.PostStorages.map(post => {
                  return <UserPost key={post.id} post={post.Post} />;
                })
              : null}
          </article>
        </User_Tab_Section>
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
