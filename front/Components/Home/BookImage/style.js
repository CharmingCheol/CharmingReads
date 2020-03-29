import styled from "styled-components";

export const Image = styled.figure`
  background-image: url(${props => props.postSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 0;
  padding-bottom: 100%;
`;

export const Book_Layout = styled.div`
  width: 50%;
  padding: 0.2rem;
  a {
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  @media (min-width: 450px) {
    width: 33%;
    padding: 0.5rem;
  }
  @media (min-width: 900px) {
    width: 25%;
    padding: 0.2rem;
  }
  @media (min-width: 1200px) {
    width: 20%;
  }
`;
