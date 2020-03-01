import styled from "styled-components";

export const UserPost_HeartComment = styled.div`
  opacity: 0;
  margin-bottom: 10px;
  font-weight: 800;
  color: #4d4d4d;
  & i {
    margin-right: 10px;
  }
`;

export const UserPost_Image = styled.img`
  width: 12vw;
  height: 15vw;
  margin: 0 0 10px 10px;
`;

export const UserPost_Section = styled.div`
  position: relative;
  /* & img {
    width: 12vw;
    height: 15vw;
    margin: 0 0 10px 10px; */
  .UserPost_Post-Info {
    position: absolute;
    top: 40%;
    left: 40%;
  }
  &:hover {
    ${UserPost_Image} {
      opacity: 0.4;
      filter: blur(0.1px);
    }
    ${UserPost_HeartComment} {
      opacity: 1;
    }
  }
`;
