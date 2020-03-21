import styled from "styled-components";

export const Image = styled.img``;

export const Book_Layout = styled.div`
  width: 50%;
  padding: 1rem;
  a {
    display: block;
    width: 100%;
    /* display: flex;
    flex-direction: column; */
    img {
      width: 100%;
      height: 30%;
    }
    h3 {
      text-align: center;
    }
  }
  @media (min-width: 650px) {
    width: 33%;
  }

  @media (min-width: 950px) {
    width: 20%;
  }
`;
