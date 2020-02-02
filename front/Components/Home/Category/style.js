import styled from "styled-components";

export const Menu = styled.ul`
  display: flex;
  justify-content: center;
  color: white;
  padding-bottom: 5vh;
  background-color: rgba(204, 174, 98, 1);
  & li:not(:last-child) {
    margin-right: 3vw;
  }
`;
