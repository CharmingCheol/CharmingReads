import styled from "styled-components";

export const Search_Section = styled.div`
  padding: 0 10vw 0 10vw;
`;

export const Search_SearchResult = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: center;
  padding: 5vw 0 5vw 0;
  margin: 2vw 0 2vw 0;
  & div {
    margin: 0 auto;
  }
  & div:first-child {
    background-color: yellow;
    width: 5em;
    height: 7em;
  }
`;
