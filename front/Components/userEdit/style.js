import styled from "styled-components";

export const UserEdit_Form = styled.form`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & div {
    display: flex;
    align-items: center;
    flex: 1;
    margin-bottom: 30px;
    & label {
      margin-right: 10px;
    }
    & input {
      width: 25em;
      border: 0.1em solid black;
      padding: 1em;
    }
  }
  & button {
    padding: 1em;
    margin-bottom: 30px;
  }
`;

export const UserEdit_Image = styled.img`
  width: 150px;
  height: 150px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
  margin-bottom: 30px;
`;
