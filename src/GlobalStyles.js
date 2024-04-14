import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f3f3f3; /* Light gray */
  }

  h1, h2, h3, h4, h5, h6 {
    color: #009879; /* Green */
  }

  a {
    color: #009879; /* Green */
    text-decoration: none;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
`;

export default GlobalStyles;