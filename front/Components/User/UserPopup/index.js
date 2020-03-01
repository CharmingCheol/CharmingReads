import React, { useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

const User_Popup = styled.div`
  .opened {
    display: block;
    position: fixed;
    top: 25%;
    left: 25%;
    width: 50%;
    height: 50%;
    padding: 20px;
    background: gray;
    z-index: 10;
  }
`;

const UserPopup = ({ popup, title }) => {
  return (
    <>
      <User_Popup className="popup">
        <div>{title}</div>
        <button>X</button>
      </User_Popup>
    </>
  );
};

export default UserPopup;
