import styled from "styled-components";

export const User_Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const User_Image = styled.div`
  width: 10vw;
  height: 10vw;
  background-color: red;
`;

export const User_Info = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

export const User_Info_Section = styled.div`
  & div {
    margin: 0 0 1.5rem 0.5rem;
  }
`;

export const User_Info_Friends = styled.div`
  display: flex;
  margin: 0 0 25px 0;
  & div {
    margin-right: 25px;
  }
`;

export const User_Button = styled.button`
  width: 100px;
  height: 40px;
  margin-right: 1vw;
  font-weight: 600;
  background-color: #ecf0f1;
  box-shadow: none;
  border: 1px solid rgb(198, 201, 207);
  border-radius: 10px;
  z-index: -10;
`;

export const User_Inrtoduce = styled.div`
  font-size: 1rem;
  & div:first-child {
    margin-bottom: 1.5em;
  }
`;

export const User_Tab_Section = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const User_Tab = styled.button`
  font-size: 1rem;
  background-color: #ecf0f1;
  border: 1px solid rgb(198, 201, 207);
  height: 50px;
`;

export const User_Post_Image = styled.div`
  font-size: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-content: center;
  justify-content: center;
  & div {
    width: auto;
    height: 16vw;
    background-color: red;
    padding: 1vw;
  }
`;
