/* Набор глобальных стилей */
import { createGlobalStyle } from "styled-components";
import normalize from 'normalize.css'; // Согласованная отрисовка HTML элементов в разных браузерах

export default createGlobalStyle`
    ${normalize}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    body, html {
        height: 100%;
        width: 0;
    }

    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    background-color: #fff;
    line-height: 1.4;
    }

    a:link, a:visited {
        color: #07c;
    }
    a:hover, a:focus {
        color: #049;
    }

    code, pre {
        max-width: 100%;
    }
`;