/* styles.js  */
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-primary: #3366ff;
    --color-secondary: #728994;
    --color-accent: #00ff00;
    --color-correct: rgb(0, 150, 0);
    --color-wrong: rgb(255, 0, 0);
    --nav-active: #00ff00;
    --nav-inactive: #ccc;
    --color-border: #456778;
    --text-color-dark: #000000;
    --text-color-light: #ffffff;
    --background-dark: rgb(1, 19, 107); 
    --color-biology: #8B9467;
    --color-chemistry: #FFC107;
    --color-geography: #34A85A;
    --color-math: #4B5154;
    --color-physics: #FFA07A;
    --color-technologiy: #456778;
    --color-art: #8F8E94;
    --color-music: #FF69B4;
    --gap: 20px;
    --font-family: var(--font-poppins, system-ui), sans-serif;
    --font-weight-light: 300;
    --font-weight-regular: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
}

*,
*::before,
*::after {
    box-sizing: border-box;
}

body {
    font-family: var(--font-family);
    font-weight: var(--font-weight-light);
    font-style: normal;
    margin: 0;
    min-height: 100vh;
    background: var(--background-dark);
    background: linear-gradient(180deg, rgba(0, 20, 100, 1) 0%, rgb(0, 0, 50) 100%);
}

main {
  width: auto;
  margin: 0 auto;
  padding: 0 30px; 
  z-index: 1;
}

h1, h2, h3, p, input, select, button, span, ul, li, a {
    font-family: var(--font-family);
}

h1 {
    color: var(--text-color-light);
    font-size: 24px;
    font-weight: var(--font-weight-light);
}

h2 {
    color: var(--text-color-dark);
    font-size: 18px;
    font-weight: var(--font-weight-light);
    margin-bottom: 20px;
}
`;
