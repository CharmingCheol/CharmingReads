import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    * {
        box-sizing:border-box;
        outline: 0;
        padding: 0;
        margin:0;
    }
    body {
        background-color:#ecf0f1;
        color:black;
        padding-top:80px;
        height:100%;
    }
    input:focus {
        outline: none;
    }
`;

export default GlobalStyles;
