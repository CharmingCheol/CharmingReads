import styled from "styled-components";

export const BookModaLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  & section:first-child {
    grid-column: span 1;
  }
  & section:last-child {
    width: 100%;
    height: 100%;
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    & img {
      width: 200px;
      height: 300px;
      margin-bottom: 10px;
    }
  }
`;

export const BookModalTabMenu = styled.div`
  position: relative;
  & ul {
    margin: 10px 0 10px 0;
    list-style: none;
    display: flex;
    flex-basis: 0;
    & li {
      flex: 1;
      text-align: center;
      padding: 1rem;
    }
  }
`;

export const ModalCommentList = styled.ul`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50px;
  left: 0;
  width: 100%;
  height: 250%;
  padding: 5px;
  word-break: break-word;
  border: solid #000000 1px;
  background: white;
  z-index: 10;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
