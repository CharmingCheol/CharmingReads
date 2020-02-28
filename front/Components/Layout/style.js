import styled from "styled-components";

export const Menu = styled.div`
  top: 0;
  left: 0;
  height: 100px;
  position: fixed;
  background-color: rgba(204, 174, 98, 1);
  padding: 3vh 10vw 3vh 10vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

export const Main = styled.div`
  padding: 5vw 10vw 0 10vw;
`;
