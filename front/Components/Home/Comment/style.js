import styled from "styled-components";

export const CommentLayout = styled.li`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  figure {
    width: 30px;
    height: 30px;
    margin-right: 1rem;
    border-radius: 50%;
    background-image: url(${props =>
      props.profileSrc
        ? props.profileSrc
        : "https://charmingbooks.s3.ap-northeast-2.amazonaws.com/basic/%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.PNG"});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  div {
    width: 100%;
    h3 {
      word-break: break-word;
    }
  }
`;
