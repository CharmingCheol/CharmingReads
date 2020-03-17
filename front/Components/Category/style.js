import styled from "styled-components";

export const Category_Section = styled.div`
  & div:first-child {
    & h3 {
      margin-bottom: 10px;
    }
    margin-bottom: 30px;
  }
`;

export const Categoty_Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 10px;
  & div {
    margin: 0 auto;
    & img {
      width: 25vw;
      height: 30vw;
      margin-bottom: 10px;
    }
  }
`;
