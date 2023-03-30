import { createGlobalStyle } from "styled-components";

export const DarkMode = createGlobalStyle`
     :root {
    --dark-background-color: hsl(0,0%, 2%);
    --light-text-color: hsl(0,0%, 2%);
    --secondary-text-color: hsl(0, 0%, 51%);
    /* --Input-bg: hsl(0, 0%, 91%); */
    --dark-text-color: hsl(0,0%,100%);
    --background-color: var(--light-background-color);
    --text-color: var(--light-text-color);
    /* --purple: hsl(274,82%,60%); */
    /* --redish: hsl(0,100%,66%); */


  }

  body {
    background-color: var(--dark-background-color);
    color: var(--dark-text-color);
  }
`