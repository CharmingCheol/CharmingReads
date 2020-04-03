import styled from "styled-components";

export const Image = styled.figure`
  background-image: url(${props => props.postSrc});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 0;
  padding-bottom: 100%;
  cursor: pointer;
`;

export const Heart_Comment = styled.div`
  opacity: 0;
  position: absolute;
  color: #4d4d4d;
  display: none;
  top: 35%;
  left: 40%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -0.3rem 0 0 -0.3rem;
  div {
    i:first-child {
      margin: 0 0.7rem 0.7rem 0;
    }
  }
`;

export const Book_Layout = styled.div`
  width: 50%;
  padding: 0.2rem;
  position: relative;
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
  &:hover {
    ${Heart_Comment} {
      opacity: 1;
      display: flex;
      div {
        display: flex;
      }
    }
  }
  @media (min-width: 450px) {
    width: ${props => (props.all ? "50%" : "33%")};
    padding: 0.5rem;
  }
  @media (min-width: 900px) {
    width: ${props => (props.all ? "33%" : "25%")};
    padding: 0.2rem;
  }
  @media (min-width: 1200px) {
    width: ${props => (props.all ? "25%" : "20%")};
  }
`;
