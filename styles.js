import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
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
    background-color: #fff;
}

main {
    flex: 1;
    max-width: 1100px;
    margin: 0 30px;
}

h1, h2 {
    margin-bottom: 20px;
}
h2 {
    color: #ccc;
    font-size: 18px;
}
h1 {
    font-family: Lucida, sans-serif;
    font-weight: 300;
    color: #287895;
}`;
