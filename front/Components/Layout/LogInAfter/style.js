import styled from "styled-components";

export const LogInAfterLayout = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const LogInAfterImage = styled.figure`
  width: 40px;
  height: 40px;
  border-radius: 2rem;
  margin-left: 1vw;
  background-image: url(${props =>
    props.profileSrc
      ? props.profileSrc
      : "https://charmingbooks.s3.ap-northeast-2.amazonaws.com/basic/%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.PNG"});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const LogInAfterButton = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 1vh;
  float: right;
  font-weight: 600;
  background-color: white;
  border-width: 0;
  border-radius: 0.5rem;
`;
