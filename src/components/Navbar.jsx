import React, { useState } from 'react'
import styled from 'styled-components'
import Select from './scripts/Select'
import "../App.css"
import Toggle from './scripts/Toggle'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--light-bg-color);
    color: var(--primary-text-color);
    padding-bottom: 30px;
`
const Left = styled.div`
    flex: 2;
`
const Logo = styled.img`
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


const Navbar = ({setFont}) => {

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
      };

  return (
    <Container>
            <Left>
                <Logo src='/images/logo.svg'/>
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

export default Navbar