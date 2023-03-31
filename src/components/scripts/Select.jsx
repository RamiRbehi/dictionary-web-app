import React, { useContext, useState } from 'react'
import styled from 'styled-components';
import { ThemeContext } from '../ThemeContext';

const Select = ({setFont}) => {
    const {isDarkMode} = useContext(ThemeContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Serif')

    const LightTheme = {
      backgroundColor: 'hsl(0,0%,100%)',
      textColor: 'var(--text-color)',
      shadowColor: '0 0 20px 0 hsl(0, 0%, 51%)',
    }
    const DarkTheme = {
      backgroundColor: 'var(--dark-background-color)',
      textColor: 'var(--dark-text-color)',
      shadowColor: '0 0 20px 0 hsl(274,82%,60%)',
    } 

    const handleSelectFont = (fontFamily) => {
      setFont(fontFamily);
    };

    const fonts = [
      {id: 1, value: "Sans Serif", fontFamily: "Inter, sans-serif"},
      {id: 2, value: "Serif", fontFamily: "Lora, serif"},
      {id: 3, value: "Mono", fontFamily: "Inconsolata, monospace"},
    ]

    const handleClick = (fontFamily, value) => {
      handleSelectFont(fontFamily);
      setIsOpen(false);
      setSelectedOption(value);
    }

  return (
    <Container>
      <DropdownButton>
        <ButtonContainer onClick={() => setIsOpen(!isOpen)}>
        <Button>
            {selectedOption || 'serif'}
        </Button>
        <ArrowIcon src='/images/icon-arrow-down.svg' width="14" height="8" viewBox="0 0 14 8" aria-label='arrow-down'>
          <path fill="none" stroke="#A445ED" strokeWidth="1.5" d="m1 1 6 6 6-6"/>
        </ArrowIcon>
        </ButtonContainer>
        <DropdownContent theme={{...LightTheme, ...(isDarkMode && DarkTheme)}}
         open={isOpen}> 
          {fonts.map((font) => (
            <DropdownOptions 
            key={font.id}
            font={font}
            onClick={()=>handleClick(font.fontFamily, font.value)}>
                {font.value}
            </DropdownOptions>
              ))}
        </DropdownContent>
      </DropdownButton>
    </Container>
  )
}

const Container = styled.div`
    font-family: ${(props) => props.fontFamily};
`;

const DropdownButton = styled.div`
    position: relative;
    display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 5px 15px;
    font-weight: 600;
    color: ${(props) => (props.isActive ? 'var(--light-text-color)' : 'var(--dark-text-color)')};

    @media only screen and (max-width: 768px) {
      padding: 5px 50px;
  }
`;
const ArrowIcon = styled.svg`
`;


const DropdownContent = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  width: 10vw;
  position: absolute;
  top: 40px;
  right: 5px;
  z-index: 2;
  background-color: ${({theme}) => theme.backgroundColor};
  color: ${({theme}) => theme.textColor};
  box-shadow: ${({theme}) => theme.shadowColor};

  @media only screen and (max-width: 768px) {
    width: 15vw;
  }

  @media only screen and (max-width: 375px) {
    width: 26vw;
  }
`;

const DropdownOptions = styled.a`
    display: block;
    padding: 10px 12px;
    text-decoration: none;
    cursor: pointer;
`;

export default Select