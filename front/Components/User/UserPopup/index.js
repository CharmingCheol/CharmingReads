import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  LOAD_FOLLOW_REQUEST,
  LOAD_FOLLOWER_REQUEST
} from "../../../redux/actions/userAction";

const PopupSection = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  width: 30%;
  height: 60%;
  padding: 20px 30px 20px 30px;

  z-index: 10;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  overflow: hidden;
  background: white;
  .PopupSection_title {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid #d9d9d9;
    margin-bottom: 20px;
    & h1 {
      text-align: center;
    }
    & button {
      z-index: 15;
      background: none;
      width: 24px;
      height: 24px;
      justify-self: right;
      border: none;
    }
  }
  .test {
    height: 100%;
    overflow: scroll;
    /* -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    } */
    & li {
      background: red;
      padding: 20px;
      margin-bottom: 5px;
    }
  }
`;

const UserPopup = ({ title, userId }) => {
  const dispatch = useDispatch();
  const popupRef = useRef();
  const listRef = useRef();
  const { userInfo } = useSelector(state => state.userReducer);

  //리스트 불러오기
  const listScroll = useCallback(() => {
    if (listRef.current.scrollHeight - listRef.current.scrollTop < 700) {
      if (title === "팔로우") {
        dispatch({
          type: LOAD_FOLLOW_REQUEST,
          lastId: userInfo.Follow
            ? userInfo.Follow[userInfo.Follow.length - 1].id
            : 0,
          userId
        });
      } else {
        dispatch({
          type: LOAD_FOLLOWER_REQUEST,
          lastId: userInfo.Follower
            ? userInfo.Follower[userInfo.Follower.length - 1].id
            : 0,
          userId
        });
      }
    }
  }, [title]);

  //팝업창 닫기
  const closePopup = useCallback(() => {
    const closePopupElem = popupRef.current.parentNode.classList;
    closePopupElem.add("none");
    closePopupElem.remove("opened");
  }, [popupRef]);

  console.log(userInfo);

  return (
    <>
      <PopupSection ref={popupRef}>
        <div className="PopupSection_title">
          <div></div>
          <h1>{title}</h1>
          {/* <button onClick={test}>X</button> */}
          <button onClick={closePopup}>X</button>
        </div>
        <div className="test" ref={listRef} onScroll={listScroll}>
          <ul>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
          </ul>
        </div>
      </PopupSection>
    </>
  );
};

export default UserPopup;
