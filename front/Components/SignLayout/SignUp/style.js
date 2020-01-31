import styled from "styled-components";

export const SignUpMain = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 100%;
  & input:not(#signUpCheck) {
    padding: 10px;
    margin: 0 auto;
    width: 50%;
    border-width: 0;
    border-radius: 15px;
    margin-bottom: 30px;
  }
  & button {
    font-weight: 600;
    color: white;
    padding: 10px;
    margin: 0 auto;
    width: 50%;
    border-width: 0;
    border-radius: 15px;
    margin-bottom: 30px;
    background-color: rgba(204, 174, 98, 1);
  }
  & div {
    margin: 0 auto;
    width: 50%;
    margin-bottom: 30px;
    font-size: 15px;
  }
`;

export const Message = styled.div`
  color: red;
`;
