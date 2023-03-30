import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { DarkMode } from '../DarkMode';
import { ThemeContext } from '../ThemeContext';

const Toggle = () => {
  const {isDarkMode, toggleDarkMode} = useContext(ThemeContext);

  const LightTheme = {
    lightBackgroundColor: 'var(--background-color)',
    lightColor: 'var(--text-color)',
    moonColor: 'hsl(0, 0%, 51%)'
  }
  const DarkTheme = {
    darkBackgroundColor: 'var(--dark-background-color)',
    darkColor: 'var(--dark-text-color)',
    moonColor: 'hsl(274, 82%, 60%)'
  }

  // const handleClick = () => {
  //   setIsDarkMode(!isDarkMode);
  // };

  // useEffect(() => {
  //   const root = document.documentElement;
  //   root.style.setProperty('--background-color', isDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)');   
  //   root.style.setProperty('--text-color' , isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)');
  //   root.style.setProperty('--moon-icon-stroke-color', isDarkMode ? 'var(--purple)' : 'hsl(0, 0%, 51%)');
  // }, [isDarkMode])

  return (
    <Container theme={{...LightTheme, ...(isDarkMode && DarkTheme)}}>
    <ToggleWrapper 
    isActive={isDarkMode} 
      onClick={toggleDarkMode}
    >
      <Circle
       isActive={isDarkMode}
      />
    </ToggleWrapper>
    {isDarkMode && <DarkMode/>}
    <MoonIcon theme={{...LightTheme, ...(isDarkMode && DarkTheme)}}
       src='/images/icon-moon.svg' width="22" height="22" viewBox="0 0 22 22">
      <path fill="none" stroke="hsl(0, 0%, 51%)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/>
    </MoonIcon>   
    </Container>
  )
} 

const Container = styled.div`
  display: flex;
  gap: 15px;
`
const MoonIcon = styled.svg`
  path{stroke: ${({theme}) => theme.moonColor};}
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