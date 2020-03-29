import styled from "styled-components";

export const UserPost_HeartComment = styled.div`
  opacity: 0;
  font-weight: bold;
  color: #4d4d4d;
  position: absolute;
  top: 40%;
  left: 40%;
  div:first-child {
    margin-bottom: 0.5rem;
  }
  i {
    margin-right: 10px;
  }
  h3 {
    display: inline;
  }
`;

export const UserPost_Section = styled.div`
  position: relative;
  width: 100%;
  figure {
    height: 30vw;
    background-image: url(${props => props.src});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  &:hover {
    ${UserPost_HeartComment} {
      opacity: 1;
    }
  }
  /* @media (min-width: 700px) {
    width: 25%;
    figure {
      height: 25vw;
    }
  } */
`;
