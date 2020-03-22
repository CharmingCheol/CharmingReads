import styled from "styled-components";

export const Comment_Form = styled.form`
  margin: 1rem 0;
  div {
    position: relative;
    display: flex;
    textarea {
      width: 100%;
      padding: 1rem 4rem 1rem 1rem;
      border: 0;
    }
    button {
      position: absolute;
      right: 1rem;
      top: 1.5rem;
      border: none;
      background: none;
    }
  }
`;
