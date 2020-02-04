import styled from "styled-components";

export const Home_Book = styled.li`
  font-size: 1rem;
  width: 15vw;
  height: 20vw;
  padding: 1em;
  margin-bottom: 1em;
  background-color: white;
  display: flex;
  flex-direction: column;
  & div:nth-child(2) {
    margin-bottom: 0.5em;
  }
`;

export const Home_Book_Image = styled.div`
  background-color: gray;
  width: 8vw;
  height: 20vw;
  margin: 0 auto;
  margin-bottom: 1vh;
`;
