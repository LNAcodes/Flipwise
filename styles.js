/* styles.js  */

import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
    --color-primary: #3366ff;
    --color-secundary: #728994;
    --color-accent: #00ff00;
    --nav-active: #ffffff;
    --nav-inactive: #ccc;
    --text-color-dark: #000000;
    --text-color-light: #ffffff;
    --background-dark: #01136B; 
    --color-biology: #8B9467;
    --color-chemistry: #FFC107;
    --color-geography: #34A85A;
    --color-math: #4B5154;
    --color-physics: #FFA07A;
    --color-technologiy: #456778;
    --color-art: #8F8E94;
    --color-music: #FF69B4;
    --gap: 20px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--background-dark);
    background: linear-gradient(180deg, rgba(0, 20, 100, 1) 0%, rgb(0, 0, 50) 100%);
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 30px; 
}

h1, h2 {
    margin-bottom: 20px;
}
h2 {
    color: var(--text-color-dark);
    font-size: 18px;
}
h1 {
    font-family: Lucida, sans-serif;
    font-weight: 300;
    color: var(--color-primary);
}`;
