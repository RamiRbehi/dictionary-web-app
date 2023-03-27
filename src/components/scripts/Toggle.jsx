import React, { useContext, useEffect, useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'

const Container = styled.div`
  display: flex;
  gap: 15px;
`
const MoonIcon = styled.img`
`
const ToggleWrapper = styled.div`
  width: 60px;
  height: 25px;
  background-color: ${(props) => (props.isActive ? 'hsl(274, 82%, 60%)' : 'hsl(0, 0%, 51%)')};
  border-radius: 15px;
  cursor: pointer;
  position: relative;
`
const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #fff;
  position: absolute;
  top: 2px;
  left: ${(props) => (props.isActive ? '37.5px' : '2.5px')};
  transition: left 0.2s ease-in-out;
`

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', isDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)') ;   
    root.style.setProperty('--text-color' , isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)')
  }, [isDarkMode])

  return (
    <Container>
    <ToggleWrapper isActive={isDarkMode} onClick={handleClick}>
      <Circle isActive={isDarkMode}/>
    </ToggleWrapper>
    <MoonIcon src='/images/icon-moon.svg'/>    
    </Container>
  )
}



export default Toggle