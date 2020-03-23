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
  margin-bottom: 1.5rem;
  .User-Info-Image {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    background-color: red;
    margin-right: 20px;
  }
  .User-Info-Section {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  button {
    font-size: 0.8rem;
    padding: 0.7em;
    margin-right: 0.5em;
    font-weight: bold;
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    z-index: -10;
    box-shadow: none;
  }
  h3 {
    font-size: 4rem;
    font-weight: 400;
    margin-bottom: 0.1em;
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
`;
