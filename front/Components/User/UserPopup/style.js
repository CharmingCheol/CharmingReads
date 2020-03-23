import styled from "styled-components";

export const PopupSection = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
  .dialog {
    width: 80vw;
    height: 60vw;
    padding: 2em;
    border-radius: 1em;
    background: white;
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
      h1 {
        text-align: center;
      }
      button {
        z-index: 2;
        background: none;
        width: 24px;
        height: 24px;
        justify-self: right;
        border: none;
      }
    }
  }
  @media (min-width: 450px) {
    .dialog {
      width: 400px;
      height: 300px;
    }
  }
  @media (min-width: 450px) {
    .dialog {
      width: 600px;
      height: 400px;
    }
  }
`;
/* .PopupSection_title {
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
  .PopupSection_main {
    height: 100%;
    overflow: scroll;
    -ms-overflow-style: none;
    ::-webkit-scrollbar {
      display: none;
    }
  } */
