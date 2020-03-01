import React, { useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const PopupSection = styled.div`
  position: fixed;
  top: 25%;
  left: 35%;
  width: 30%;
  height: 60%;
  z-index: 10;
  border: 1px black solid;
  overflow: hidden;
  & ul {
    overflow: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const UserPopup = ({ title, userId }) => {
  const dispatch = useDispatch();
  const popupParent = useRef();

  //리스트 불러오기
  useEffect(() => {}, []);

  //팝업창 닫기
  const closePopup = useCallback(() => {
    const closePopupElem = popupParent.current.parentNode.classList;
    closePopupElem.add("none");
    closePopupElem.remove("opened");
  }, []);

  return (
    <>
      <PopupSection ref={popupParent}>
        <div>{title}</div>
        <button onClick={closePopup}>X</button>
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
      </PopupSection>
    </>
  );
};

export default UserPopup;
