import React, { useEffect, useState } from 'react'

const Toggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClick = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--background-color', isDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)');   
    root.style.setProperty('--text-color' , isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)');
    root.style.setProperty('--moon-icon-stroke-color', isDarkMode ? 'var(--purple)' : '#838383');
  }, [isDarkMode])

  return (
    <Container>
    <ToggleWrapper isActive={isDarkMode} onClick={handleClick}>
      <Circle isActive={isDarkMode}/>
    </ToggleWrapper>
    <MoonIcon src='/images/icon-moon.svg' width="22" height="22" viewBox="0 0 22 22">
      <path fill="none" stroke="var(--moon-icon-stroke-color)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/>
    </MoonIcon>   
    </Container>
  )
} 

const Container = styled.div`
  display: flex;
  gap: 15px;
`
const MoonIcon = styled.svg`
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


export default Toggle