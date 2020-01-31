import styled from "styled-components";

export const Input = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  & input {
    width: 50%;
    padding: 10px;
    margin: 30px 0 60px 0;
    text-align: 20px;
    border-radius: 20px;
    border: none;
  }
  & i {
    position: absolute;
    color: #aaa69d;
    width: -50px;
  }
`;
