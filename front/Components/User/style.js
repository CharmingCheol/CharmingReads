import styled from "styled-components";

export const User_Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .User-Introduce {
    font-size: 1rem;
    margin-bottom: 1em;
  }
`;

export const User_Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  .User-Info {
    display: flex;
  }
  .User-Info-Image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: red;
    margin: 0 1rem 1rem 0;
  }
  .User-Info-Section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .User-Info-Buttons {
    display: flex;
  }
  button {
    font-size: 0.8rem;
    padding: 0.5em;
    margin-right: 0.5em;
    font-weight: bold;
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    box-shadow: none;
  }
  h3 {
    font-size: 4rem;
    font-weight: 400;
    margin-bottom: 0.1em;
  }

  @media (min-width: 600px) {
    .User-Info-Image {
      width: 150px;
      height: 150px;
    }
  }

  @media (min-width: 1000px) {
    .User-Info-Image {
      width: 200px;
      height: 200px;
    }
  }
`;

export const User_Info_Friends = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em 0 1em 0;
  margin-bottom: 1.5em;
  border-top: solid rgb(198, 201, 207);
  border-bottom: solid rgb(198, 201, 207);
  .User-Info-Friends {
    margin-right: 25px;
  }
  .opened {
    display: block;
  }
  .none {
    display: none;
  }
  h3 {
    font-size: 0.8rem;
  }
`;

export const User_Tab_Section = styled.div`
  ul {
    display: flex;
    padding: 1em;
    li {
      text-align: center;
      width: 50%;
    }
  }
  article {
    display: flex;
    flex-wrap: wrap;
  }
  article:last-child {
    display: none;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
  }
`;

export const User_Tab_Post_Grid = styled.div`
  display: none;
`;
