import styled from "styled-components";

export const LogInMain = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & input {
    width: 30vw;
    padding: 1em;
    margin: 0 auto;
    border-width: 0;
    border-radius: 15em;
    margin-bottom: 2em;
  }
  & button {
    font-weight: 600;
    color: white;
    padding: 1em;
    margin: 0 auto;
    width: 30vw;
    border-width: 0;
    border-radius: 15em;
    margin-bottom: 2em;
    background-color: rgba(204, 174, 98, 1);
  }
`;

export const LogInForm = styled.form`
  display: flex;
  flex-direction: column;
`;
