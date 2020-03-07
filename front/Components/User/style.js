import styled from "styled-components";

export const User_Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const User_Info = styled.div`
  display: flex;
  margin-bottom: 50px;
  .User-Info_Image {
    width: 10vw;
    height: 10vw;
    background-color: red;
    margin-right: 10px;
  }
`;

export const User_Info_Section = styled.div`
  .User-Info-Section_Button {
    width: 100px;
    height: 40px;
    margin: 10px 10px 10px 0;
    font-weight: 600;
    background-color: #ecf0f1;
    box-shadow: none;
    border: 1px solid rgb(198, 201, 207);
    border-radius: 10px;
    z-index: -10;
  }
`;

export const User_Info_Friends = styled.div`
  display: flex;
  margin: 0 0 25px 0;
  .User-Info-Friends {
    margin-right: 25px;
  }
  .opened {
    display: block;
  }
  .none {
    display: none;
  }
`;

export const User_Inrtoduce = styled.div`
  font-size: 1rem;
  & div:first-child {
    margin-bottom: 1.5em;
  }
`;

export const User_Tab_Section = styled.div`
  & article {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding: 0;
  }
  & article:last-child {
    display: none;
  }
  & ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    & li {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 0 20px 0;
    }
  }
`;
