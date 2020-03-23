import styled from "styled-components";

export const CommentLayout = styled.li`
  display: flex;
  margin-bottom: 1rem;
  width: 100%;
  img {
    width: 4vw;
    height: 4vw;
    margin-right: 1rem;
    border-radius: 50%;
  }
  div {
    width: 100%;
    h3 {
      word-break: break-word;
    }
  }
`;
