import styled from "styled-components";

export const Book_Main = styled.div`
  h3 {
    margin-bottom: 1rem;
  }
  h3:first-child {
    border: 1px solid rgb(198, 201, 207);
    padding: 0.5rem;
  }
  figure {
    background-image: url(${props => props.postSrc});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 70%;
    height: 0;
    padding-bottom: 80%;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
`;

export const Book_User_Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  figure {
    background-image: url(${props =>
      props.profileSrc
        ? props.profileSrc
        : "https://charmingbooks.s3.ap-northeast-2.amazonaws.com/basic/%EA%B8%B0%EB%B3%B8%EC%9D%B4%EB%AF%B8%EC%A7%80.PNG"});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: calc(50px + 3vw);
    width: calc(50px + 3vw);
    border-radius: 50%;
    margin-right: 1rem;
  }
  div {
    display: flex;
    flex-direction: column;
    h3:first-child {
      font-weight: bold;
    }
  }
`;

export const Book_Comment_Menu = styled.ul`
  display: flex;
  margin-bottom: 1rem;
  li {
    width: 50%;
    text-align: center;
  }
`;

export const Book_Comment_List = styled.ul`
  width: 100%;
  height: 100px;
  display: none;
`;

export const Book_Layout = styled.div`
  @media (min-width: 750px) {
    display: flex;
    .Flex-Section {
      width: 50%;
    }
    .Second {
      padding: 0 0 0 1rem;
      overflow: scroll;
      -ms-overflow-style: none;
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .Second-A {
      margin-bottom: 1rem;
    }
    ${Book_Comment_List} {
      display: block;
    }
  }
`;
