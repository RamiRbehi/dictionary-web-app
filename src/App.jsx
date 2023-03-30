import Navbar from './components/Navbar';
import "./App.css"
import { useContext, useState } from 'react';
import Dictionary from './components/Dictionary';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';
import styled from 'styled-components';


function App() {
  const [font, setFont] = useState('Lora, serif');

  const LightTheme = {
    backgroundColor: 'var(--background-color)',
    textColor: 'var(--text-color)'
  }
  const DarkTheme = {
    backgroundColor: 'var(--dark-background-color)',
    textColor: 'var(--dark-text-color)'
  } 
  

  return (
      <ThemeProvider>
    <Container>
      <Navbar setFont={setFont}/>
      <Dictionary font={font}/>
    </Container>
      </ThemeProvider>
    
  );
}

const Container = styled.div`
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.textColor};
`
export default App;