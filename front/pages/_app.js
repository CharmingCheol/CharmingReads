import React from "react";
import Homelayout from "../Components/Layout";

const initialState = ({ Component }) => {
  return (
    <Homelayout>
      <Component />
    </Homelayout>
  );
};

export default initialState;
