import React, { useCallback, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";

import {
  LOAD_USER_DETAIL_REQUEST,
  FOLLOW_REQUEST,
  UNFOLLOW_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_USER_SAVED_POSTS_REQUEST
} from "../redux/actions/userAction";
import UserPost from "../Components/User/UserPost";
import UserPopup from "../Components/User/UserPopup";
import {
  User_Section,
  User_Info,
  User_Info_Section,
  User_Info_Friends,
  User_Inrtoduce,
  User_Tab_Section
} from "../Components/User/style";

import styled from "styled-components";

const Fixed = styled.div`
  position: fixed;
`;

const User = ({ id }) => {
  const { me, userInfo, hasMoreUserPost, hasMoreUserSavedPost } = useSelector(
    state => state.userReducer
  );
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
        data: {
          user: id,
          me: me.id,
          followCount: me.followCount,
          followerCount: userInfo.followerCount
        }
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: {
          user: id,
          me: me.id,
          followCount: me.followCount,
          followerCount: userInfo.followerCount
        }
      });
    }
  }, [
    followed,
    me && me.id,
    userInfo && userInfo.followCount,
    userInfo && userInfo.followerCount
  ]);

  //tab 메뉴 변경
  const onClickTab = useCallback(
    event => {
      if (event.target.classList.contains("fa-th")) {
        tab01.current.style = "display:grid";
        tab01.current.className = "grid";
        tab02.current.style = "display:none";
        tab02.current.className = "";
      } else {
        tab01.current.style = "display:none";
        tab01.current.className = "";
        tab02.current.style = "display:grid";
        tab02.current.className = "grid";
      }
    },
    [tab01, tab02]
  );

  //팔로워 팝업창 출력
  const FollowerPopup = useCallback(event => {
    const targetElem = event.target;
    if (targetElem.classList.contains("popup")) {
      targetElem.nextSibling.classList.add("opened");
      targetElem.nextSibling.classList.remove("none");
    }
  }, []);

  //게시글, 저장한 게시글 불러오기
  const onScrollPosts = useCallback(() => {
    if (document.documentElement.scrollHeight - scrollY < 750) {
      if (tab01.current.className === "grid") {
        if (
          hasMoreUserPost !== userInfo &&
          userInfo.Posts[userInfo.Posts.length - 1].id
        ) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            userId: id,
            lastId: userInfo.Posts[userInfo.Posts.length - 1]["id"]
          });
        }
      } else {
        if (
          hasMoreUserSavedPost !==
          userInfo.PostStorages[userInfo.PostStorages.length - 1].id
        ) {
          dispatch({
            type: LOAD_USER_SAVED_POSTS_REQUEST,
            userId: id,
            lastId:
              userInfo.PostStorages[userInfo.PostStorages.length - 1]["id"]
          });
        }
      }
    }
  }, [
    tab01,
    hasMoreUserPost,
    userInfo && userInfo.Posts,
    userInfo && userInfo.PostStorages
  ]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollPosts);
    return () => {
      window.removeEventListener("scroll", onScrollPosts);
    };
  }, [
    hasMoreUserPost,
    userInfo && userInfo.Posts,
    userInfo && userInfo.PostStorages
  ]);

  return (
    <>
      <User_Section>
        {/* fixed하면 Grid 풀리는걸 해결하기 위해 임의의 div 태그 추가 */}
        <div></div>
        <Fixed>
          <User_Info>
            <img className="User-Info_Image" />
            <User_Info_Section>
              <div>
                <div>{userInfo ? userInfo.nickName : null}</div>
                {me && userInfo && me.id === userInfo.id ? (
                  <>
                    <Link href="/post">
                      <button className="User-Info-Section_Button Post_Button">
                        게시글 추가
                      </button>
                    </Link>
                    <Link href="/userEdit">
                      <button className="User-Info-Section_Button Edit_Button">
                        프로필 편집
                      </button>
                    </Link>
                  </>
                ) : me ? (
                  <button onClick={followToggle}>
                    {followed ? "언팔로우" : "팔로우"}
                  </button>
                ) : null}
              </div>
              <User_Info_Friends>
                <div className="User-Info-Friends PostCount">{`게시글 ${
                  userInfo ? userInfo.postCount : null
                }`}</div>
                <div className="User-Info-Friends FollowerCount">
                  <div className="popup" onClick={FollowerPopup}>{`팔로워 ${
                    userInfo ? userInfo.followerCount : null
                  }`}</div>
                  <div className="none">
                    <UserPopup
                      title="팔로워"
                      userId={id}
                      data={userInfo ? userInfo.Follower : null}
                    />
                  </div>
                </div>
                <div className="User-Info-Friends FollowCount">
                  <div className="popup" onClick={FollowerPopup}>{`팔로우 ${
                    userInfo ? userInfo.followCount : null
                  }`}</div>
                  <div className="none">
                    <UserPopup
                      title="팔로우"
                      userId={id}
                      data={userInfo ? userInfo.Follow : null}
                    />
                  </div>
                </div>
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
        </Fixed>
        <User_Tab_Section>
          <ul>
            <li onClick={onClickTab}>
              <i className="fas fa-th"></i>
            </li>
            <li onClick={onClickTab}>
              <i className="far fa-bookmark"></i>
            </li>
          </ul>
          <article className="grid" ref={tab01}>
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
