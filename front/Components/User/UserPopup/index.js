import React, { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  LOAD_FOLLOW_REQUEST,
  LOAD_FOLLOWER_REQUEST
} from "../../../redux/actions/userAction";
import UserFollowList from "./UserFollowList";
import { PopupSection } from "./style";

const UserPopup = ({ title, userId, data }) => {
  const dispatch = useDispatch();
  const popupRef = useRef();
  const listRef = useRef();
  const { userInfo, hasMoreFollow, hasMoreFollower } = useSelector(
    state => state.userReducer
  );

  //리스트 불러오기
  const listScroll = useCallback(() => {
    if (listRef.current.scrollHeight - listRef.current.scrollTop < 450) {
      if (title === "팔로우") {
        if (hasMoreFollow !== userInfo.Follow[userInfo.Follow.length - 1].id) {
          dispatch({
            type: LOAD_FOLLOW_REQUEST,
            lastId: userInfo.Follow
              ? userInfo.Follow[userInfo.Follow.length - 1].id
              : 0,
            userId
          });
        }
      } else {
        if (
          hasMoreFollower !== userInfo.Follower[userInfo.Follower.length - 1].id
        ) {
          dispatch({
            type: LOAD_FOLLOWER_REQUEST,
            lastId: userInfo.Follower
              ? userInfo.Follower[userInfo.Follower.length - 1].id
              : 0,
            userId
          });
        }
      }
    }
  }, [
    title,
    hasMoreFollow,
    hasMoreFollower,
    userInfo && userInfo.Follow,
    userInfo && userInfo.Follower
  ]);

  //팝업창 닫기
  const closePopup = useCallback(() => {
    const closePopupElem = popupRef.current.parentNode.classList;
    closePopupElem.add("none");
    closePopupElem.remove("opened");
  }, [popupRef]);

  return (
    <>
      <PopupSection ref={popupRef}>
        <div className="dialog">
          <div className="PopupSection_title">
            <div></div>
            <h1>{title}</h1>
            <button onClick={closePopup}>X</button>
          </div>
          <div
            className="PopupSection_main"
            ref={listRef}
            onScroll={listScroll}
          >
            <ul>
              {data
                ? data.map(data => {
                    return (
                      <UserFollowList
                        key={data.id + Math.random() * 10}
                        data={data}
                      />
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </PopupSection>
    </>
  );
};

export default UserPopup;
