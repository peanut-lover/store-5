import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    
    a{
        text-decoration: none;
        color: inherit;
    }
    *{
        box-sizing: border-box;
    }
    body {
        font-family: 'Do Hyeon', sans-serif;
        font-size: 14px;
    }
`;

export default GlobalStyles;
