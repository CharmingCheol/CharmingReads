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
  padding: 0.3rem;
  figure {
    height: 0;
    padding-bottom: 100%;
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
  @media (min-width: 500px) {
    width: 50%;
  }
  @media (min-width: 900px) {
    width: 33%;
  }
`;
