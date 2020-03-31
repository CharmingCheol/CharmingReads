import styled from "styled-components";

export const SignUpMain = styled.form`
  width: 100%;
  height: calc(100vh - 80px - 4rem);
  font-size: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & input:not(#signUpCheck) {
    width: 30vw;
    padding: 1em;
    margin: 0 auto;
    border-width: 0;
    border-radius: 15em;
    margin-bottom: 1.5em;
  }
  & button {
    font-weight: 600;
    color: white;
    padding: 1em;
    margin: 0 auto;
    width: 30vw;
    border-width: 0;
    border-radius: 15em;
    margin-bottom: 1.5em;
    background-color: rgba(204, 174, 98, 1);
  }
  & div {
    margin: 0 auto;
    margin-bottom: 3vh;
  }
  label {
    margin-left: 0.5rem;
  }
`;

export const Message = styled.div`
  color: red;
`;
