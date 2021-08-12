import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle` 
    ${reset}
    @import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');

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

// TODO: (jiho) font 배민 주아체로 변경하기

export default GlobalStyles;
