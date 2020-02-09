import styled from "styled-components";

export const BookList_Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3vh 0 3vh 0;
`;

export const BookList_List = styled.ul`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export const BookList_Title = styled.ul`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1em;
`;
