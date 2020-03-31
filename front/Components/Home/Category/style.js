import styled from "styled-components";

export const Menu = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  color: white;
  padding-bottom: 30px;
  background-color: rgba(204, 174, 98, 1);
  cursor: pointer;
  & li:not(:last-child) {
    margin-right: 30px;
  }

  @media (max-width: 900px) {
    flex-wrap: wrap;
    li {
      padding: 10px;
      width: 25%;
      flex: 1 auto;
      display: flex;
      justify-content: center;
    }
    & li:not(:last-child) {
      margin-right: 0px;
    }
  }
`;
