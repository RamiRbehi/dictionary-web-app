import { createGlobalStyle } from "styled-components";

export const DarkMode = createGlobalStyle`
     :root {
    --dark-background-color: hsl(0,0%, 2%);
    --light-text-color: hsl(0,0%, 2%);
    --secondary-text-color: hsl(0, 0%, 51%);
    --dark-text-color: hsl(0,0%,100%);
    --background-color: var(--light-background-color);
    --text-color: var(--light-text-color);


  }

  body {
    background-color: var(--dark-background-color);
    color: var(--dark-text-color);
  }
`