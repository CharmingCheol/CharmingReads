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
  User_Info_Friends,
  User_Tab_Section,
  User_Tab_Post_Grid
} from "../Components/User/style";

const User = ({ id }) => {
  const {
    me,
    userInfo,
    userPosts,
    userSavedPosts,
    hasMoreUserPost,
    hasMoreUserSavedPost
  } = useSelector(state => state.userReducer);
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
        tab01.current.classList.add("grid");
        tab02.current.classList.remove("grid");
      } else {
        tab01.current.classList.remove("grid");
        tab02.current.classList.add("grid");
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
          hasMoreUserPost !== userPosts &&
          userInfo.Posts[userInfo.Posts.length - 1].id
        ) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            userId: id,
            lastId: userPosts && userPosts[userPosts.length - 1].id
          });
        }
      } else {
        if (
          hasMoreUserSavedPost !== userSavedPosts &&
          userSavedPosts[userSavedPosts.length - 1].id
        ) {
          dispatch({
            type: LOAD_USER_SAVED_POSTS_REQUEST,
            userId: id,
            lastId:
              userSavedPosts && userSavedPosts[userSavedPosts.length - 1].id
          });
        }
      }
    }
  }, [
    tab01,
    userPosts && userPosts[userPosts.length - 1],
    userSavedPosts && userSavedPosts[userSavedPosts.length - 1]
  ]);

  useEffect(() => {
    window.addEventListener("scroll", onScrollPosts);
    return () => {
      window.removeEventListener("scroll", onScrollPosts);
    };
  }, [
    userPosts && userPosts[userPosts.length - 1],
    userSavedPosts && userSavedPosts[userSavedPosts.length - 1]
  ]);

  return (
    <>
      <User_Section>
        <div>
          <User_Info>
            <div className="User-Info">
              <img className="User-Info-Image" />
              <h3>{userInfo.nickName}</h3>
            </div>
            <div className="User-Info-Section">
              <div className="User-Info-Buttons">
                {me && userInfo && me.id === userInfo.id ? (
                  <>
                    <Link href="/post">
                      <a>
                        <button>게시글 추가</button>
                      </a>
                    </Link>
                    <Link href="/userEdit">
                      <a>
                        <button>프로필 편집</button>
                      </a>
                    </Link>
                  </>
                ) : me ? (
                  <button onClick={followToggle}>
                    {followed ? "언팔로우" : "팔로우"}
                  </button>
                ) : null}
              </div>
            </div>
          </User_Info>
          <h3 className="User-Introduce">
            {userInfo && userInfo.introduction
              ? userInfo.introduction
              : "소개글이 없습니다"}
          </h3>
          <User_Info_Friends>
            <h3 className="User-Info-Friends PostCount">{`게시글 ${userInfo.postCount}`}</h3>
            <div className="User-Info-Friends FollowerCount">
              <h3
                className="popup"
                onClick={FollowerPopup}
              >{`팔로워 ${userInfo.followerCount}`}</h3>
              <div className="none">
                <UserPopup
                  title="팔로워"
                  userId={id}
                  data={userInfo.Follower}
                />
              </div>
            </div>
            <div className="User-Info-Friends FollowCount">
              <h3
                className="popup"
                onClick={FollowerPopup}
              >{`팔로우 ${userInfo.followCount}`}</h3>
              <div className="none">
                <UserPopup title="팔로우" userId={id} data={userInfo.Follow} />
              </div>
            </div>
          </User_Info_Friends>
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
          <User_Tab_Post_Grid className="grid" ref={tab01}>
            {userPosts.map(post => {
              return <UserPost key={post.id} post={post} />;
            })}
          </User_Tab_Post_Grid>
          <User_Tab_Post_Grid ref={tab02}>
            {userSavedPosts.map(post => {
              return <UserPost key={post.id + 0.1} post={post.Post} />;
            })}
          </User_Tab_Post_Grid>
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
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: { userId: id, lastId: 0 }
  });
  context.store.dispatch({
    type: LOAD_USER_SAVED_POSTS_REQUEST,
    data: { userId: id, lastId: 0 }
  });
  return { id };
};

export default User;
