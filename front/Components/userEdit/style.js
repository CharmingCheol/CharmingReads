import styled from "styled-components";

export const UserEdit_Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  div {
    margin-bottom: 1.5rem;
  }
  input,
  textarea {
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    padding: 0.5rem;
  }
  textarea {
    padding-bottom: 5rem;
  }
  button {
    font-size: 0.8rem;
    padding: 0.7em 1.5em 0.7em 1.5em;
    margin-right: 0.5em;
    font-weight: bold;
    background: #ecf0f1;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 1em;
    z-index: -10;
    box-shadow: none;
  }
  @media (min-width: 450px) {
    div {
      width: 100%;
    }
    input,
    textarea {
      width: 100%;
    }
  }
  @media (min-width: 650px) {
    figure {
      width: 200px;
      height: 200px;
    }
    div {
      width: 100%;
      display: flex;
    }
    h3 {
      width: 20%;
    }
    input,
    textarea {
      width: 80%;
    }
  }
`;

export const UserEdit_Image = styled.figure`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-image: url(${props =>
    props.profileImg
      ? props.profileImg
      : "https://charmingbooks.s3.ap-northeast-2.amazonaws.com/basic/%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.PNG"});
`;
