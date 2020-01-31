import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    * {
        box-sizing:border-box
    }
    html, body {
        height:100%;
        width: 100%;
    }
    body {
        background-color:#ecf0f1;
        color:black;
    }
    input:focus {
        outline: none;
    }
`;

export default GlobalStyles;
