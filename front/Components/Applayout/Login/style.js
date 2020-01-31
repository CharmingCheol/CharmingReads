import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  justify-content: flex-end;
  & div {
    display: flex;
    flex-direction: column;
  }
  & input {
    margin-right: 10px;
    padding: 5px;
    border-width: 0px;
    border-radius: 10px;
    &:first-child {
      margin-bottom: 10px;
    }
  }
`;
