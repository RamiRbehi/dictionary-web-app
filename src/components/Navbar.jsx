import React, { useContext } from 'react'
import styled from 'styled-components'
import Select from './scripts/Select'
import "../App.css"
import Toggle from './scripts/Toggle'
import { ThemeContext } from './ThemeContext'


const Navbar = ({setFont}) => {
    const {isDarkMode} = useContext(ThemeContext);

    const LightTheme = {
        backgroundColor: 'var(--background-color)',
        textColor: 'var(--text-color)'
      }
      const DarkTheme = {
        backgroundColor: 'var(--dark-background-color)',
        textColor: 'var(--dark-text-color)'
      } 

  return (
    <Container theme={{...LightTheme, ...(isDarkMode && DarkTheme)}}>
            <Left>
                <Logo src='/images/logo.svg' width="34" height="38" viewBox="0 0 34 38" aria-label='logo'>
                    <g fill="none" fillRule="evenodd" stroke="#838383" strokeLinecap="round" strokeWidth="1.5">
                    <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/>
                    <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8"/>
                    <path d="M11 9h12"/>
                    </g>
                </Logo>
            </Left>
            <Right>
                <SelectContainer>
                    <Select setFont={setFont} isDarkMode={isDarkMode}/>
                </SelectContainer>
                <NightMode>
                    <Toggle isDarkMode={isDarkMode}/>
                </NightMode>
            </Right>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${({theme}) => theme.backgroundColor};
    color: ${({theme}) => theme.textColor};
    padding-bottom: 30px;
`
const Left = styled.div`
    flex: 2;
`
const Logo = styled.svg`
`
const Right = styled.div`
    flex: 1;
    display: flex;
    justify-content: end;
    place-items: center;
`
const SelectContainer = styled.div`
    padding-right: 50px;
`
const NightMode = styled.div`
`

export default Navbar