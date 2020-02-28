import styled from "styled-components";

export const UserPost_Image = styled.div`
  position: relative;
  & img {
    width: 12vw;
    height: 15vw;
    margin: 0 0 10px 10px;
  }
  & div:first-child {
    position: absolute;
    & i {
      margin-right: 10px;
    }
  }
  & div:last-child {
    position: absolute;
    & i {
      margin-right: 10px;
    }
  }
`;
