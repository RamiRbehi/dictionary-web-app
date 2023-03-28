import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';

const Select = ({setFont, isDarkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Serif')
    // const [shadowColor, setShadowColor] = useState('var(--shadow-box)');

    useEffect(() => {
      const dropdownContent = document.querySelector('.dropdown-content');
      dropdownContent.style.backgroundColor = isDarkMode ? '#333' : '#fff';
      dropdownContent.style.boxShadow = isDarkMode ? '0 0 4px rgba(0, 0, 0, 0.25)' : 'none';
    }, [isDarkMode]);
    // useEffect(() => {
    //   setShadowColor(isActive ? 'var(--purple)' : 'var(--shadow-box)')
    // }, [isActive])

    // useEffect(() => {
    //   const root = document.documentElement;
    //   root.style.setProperty('--background-color', isDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)') ;   
    //   root.style.setProperty('--primary-text-color' , isDarkMode ? 'var(--dark-text-color)' : 'var(--text-color)')
    // }, [isDarkMode])

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
        <Button onClick={() => setIsOpen(!isOpen)}>
            {selectedOption || 'serif'}
        <ArrowIcon src='/images/icon-arrow-down.svg'/>
        </Button>
        <DropdownContent className="dropdown-content" open={isOpen}> 
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

const Button = styled.button`
    border: none;
    background-color: transparent;
    cursor: pointer;
    padding: 5px 20px;
    font-weight: 600;
    color: ${(props) => (props.isActive ? 'var(--light-text-color)' : 'var(--dark-text-color)')};
`;
const ArrowIcon = styled.img`
    /* padding-left: 10px; */
`;


const DropdownContent = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  width: 10vw;
  position: absolute;
  top: 40px;
  right: 5px;
  z-index: 2;
  /* background-color: var(--light-background-color); */
  /* box-shadow: 0px 5px 20px 1px hsl(0,0%,51%); */
  /* background-color: ${(props) => (props.isActive ? 'var(--dark-background-color)' : 'var(--light-background-color)')}; */
  /* background-color: ${(props) => props.backgroundColor}; */
  /* box-shadow: ${(props) => (props.isDarkMode ? 'var(--purple)' : 'var(--primary-shadow-box)')}; */
  /* background-color: ${(props) => (props.isDarkMode ? 'var(--dark-background-color)' : 'var(--light-background-color)')}; */

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
    color: #000;
    cursor: pointer;
`;

export default Select