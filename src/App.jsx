import MyOtherComponent from './components/MyOtherComponent'
import Navbar from './components/Navbar';
import "./App.css"
import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import Dictionary from './components/Dictionary';
import Error from './components/Error';

// const lightTheme = {
//   /* light-mode */
//   '--light-bg-color': 'hsl(0,0%,100%)',
//   '--primary-text-color': 'hsl(0,0%,46%)',
//   '--secondary-text-color': 'hsl(0,0%,18%)',
//   '--secondary-bg-color': '#f4f4f4',
//   '--heading-color': 'hsl(0, 0%, 18%)',
//   '--moon-path': 'hsl(0, 0%, 46%)',
//   '--select-menu': 'hsl(0,0%,100%)',
//   '--box-shadow': '0px 5px 30px hsla(0, 0%, 0%, 0.1)',
//   '--horizontal-divider': 'hsl(0, 0%, 23%)'
// };

// const darkTheme = {
//   /* dark-mode */
//   '--primary-text-color': 'hsl(0,0%,100%)',
//   '--secondary-text-color': 'var(--white)',
//   '--dark-bg-color': '#050505',
//   '--secondary-bg-color': '#1f1f1f',
//   '--heading-color': 'var(--white)',
//   '--moon-path': 'var(--purple)',
//   '--select-menu': 'hsl(0, 0%, 12%)',
//   '--box-shadow': '0px 5px 30px var(--purple)',
//   '--horizontal-divider': 'hsl(0, 0%, 91%)'
// };

// const GlobalStyle = createGlobalStyle`
//   :root {
//     /* light-mode */
//     --light-bg-color: hsl(0,0%,100%);
//     --primary-text-color: hsl(0,0%,46%);
//     --secondary-text-color: hsl(0,0%,18%);
//     --secondary-bg-color: #f4f4f4;
//     --heading-color: hsl(0, 0%, 18%);
//     --moon-path: hsl(0, 0%, 46%);
//     --select-menu: hsl(0,0%,100%);
//     --box-shadow: 0px 5px 30px hsla(0, 0%, 0%, 0.1);
//     --horizontal-divider: hsl(0, 0%, 23%);

//     /* dark-mode */
//     --primary-text-color: hsl(0,0%,100%);
//   --secondary-text-color: hsl(0,0%,100%);
//   --dark-bg-color: #050505;
//   --secondary-bg-color: #1f1f1f;
//   --heading-color: var(--white);
//   --moon-path: var(--purple);
//   --select-menu: hsl(0, 0%, 12%);
//   --box-shadow: 0px 5px 30px var(--purple);
//   --horizontal-divider: hsl(0, 0%, 91%);
//   }
// `

const GlobalStyles = createGlobalStyle`
  :root {
    --light-background-color: hsl(0,0%,100%);
    --dark-background-color: hsl(0,0%, 2%);
    --light-text-color: hsl(0,0%, 2%);
    --secondary-text-color: hsl(0, 0%, 51%);
    --shadow-box: hsl(0, 0%, 51%);
    --Input-bg: hsl(0, 0%, 91%);
    --dark-text-color: hsl(0,0%,100%);
    --background-color: var(--light-background-color);
    --text-color: var(--light-text-color);
    --purple: hsl(274,82%,60%);
    --redish: hsl(0,100%,66%);
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }
`;

function App() {
  const [font, setFont] = useState('Lora, serif');
  const [isDarkMode, setIsDarkMode] = useState(false);
  

  return (
    <div>
      <GlobalStyles/>
      <Navbar setFont={setFont} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
      <Dictionary font={font}/>
      {/* <Error/> */}
      {/* <MyOtherComponent font={font} isDarkMode={isDarkMode}/> */}
    </div>
    
  );
}
export default App;