import styled from "styled-components";

export const Menu = styled.div`
  z-index: 20;
  top: 0;
  left: 0;
  height: 80px;
  width: 100%;
  position: fixed;
  background-color: rgba(204, 174, 98, 1);
  padding: 3vh 10vw 3vh 10vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  @media (max-width: 700px) {
    h3,
    button {
      display: none;
    }
  }
`;

export const Main = styled.div`
  padding: 2rem 4rem 2rem 4rem;
`;
