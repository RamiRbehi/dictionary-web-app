import Navbar from './components/Navbar';
import "./App.css"
import { useState } from 'react';
import Dictionary from './components/Dictionary';
import { ThemeProvider } from './components/ThemeContext';
import styled from 'styled-components';


function App() {
  const [font, setFont] = useState('Lora, serif');
  
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
`
export default App;