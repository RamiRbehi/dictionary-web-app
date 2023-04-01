import axios from 'axios'
import React, { useContext, useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Error from './Error'
import { ThemeContext } from './ThemeContext'
import { DotWave } from '@uiball/loaders'



const Dictionary = ({font}) => {
    const {isDarkMode} = useContext(ThemeContext);
    const [word, setWord] = useState("keyboard");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [isEmptyInput, setIsEmptyInput] = useState(false);

    const LightTheme = {
        backgroundColor: 'var(--background-color)',
        textColor: 'var(--text-color)'
      }
      const DarkTheme = {
        backgroundColor: 'var(--dark-background-color)',
        textColor: 'var(--dark-text-color)'
      } 

    useEffect(() => {
        const fetchDefaultWord = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                setData(response.data);
            } catch (error) {
                setError (error);
            } finally {
                setLoading(false);
            }
        };
        fetchDefaultWord();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (word === "") {
            setIsEmptyInput(true);
            return;
        } else {
            setIsEmptyInput(false);
        }
        setLoading(true);
        setError(null);
        setAudioError(false);
        try {
          const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
          setData(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };

      const handlePlayAudio = () => {
        const audioObj = data[0].phonetics.find((obj) => obj.audio !== "");
        if (audioObj) {
          const audioUrl = audioObj.audio;
          const newAudio = new Audio(audioUrl);
          newAudio.play().catch(() => {
            setAudioError(true);
          });
        }
      };

    const nounDefinitions = data?.[0]?.meanings.filter((meaning) => meaning.partOfSpeech === "noun")?.[0]?.definitions;
    const verbDefinitions = data?.[0]?.meanings.filter((meaning) => meaning.partOfSpeech === "verb")?.[0]?.definitions;

    const svgRef = useRef(null);

    const handleMouseOver = () => {
        svgRef.current.querySelector('path').style.fill = 'hsl(0,0%,100%)';
    };

    const handleMouseOut = () => {
        svgRef.current.querySelector('path').style.fill = 'hsl(274,82%,60%)';
    };
  return (
    <Container theme={{...LightTheme, ...(isDarkMode && DarkTheme)}} 
        style={{fontFamily: font }}>
        <Form onSubmit={handleSearch}>
            <Input style={{fontFamily: font,
                borderColor: isEmptyInput ? 'hsl(0,100%,66%)' : 'hsl(274,82%,60%)'
                }}
                 placeholder='Search for any word...'
                 value={word}
                 onChange={(e) => {
                    setWord(e.target.value)
                    setIsEmptyInput(e.target.value === "")
                    }}
                    autoFocus
                 />
            <SearchIcon src='/images/icon-search.svg'  width="18" height="18" viewBox="0 0 18 18" aria-label='search-icon' 
                onClick={handleSearch}>
                    <path fill="none" stroke="#A445ED" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/>
                </SearchIcon>
        </Form>
                {isEmptyInput && <ErrorMessage>Whoops, can't be empty...</ErrorMessage>}

    {loading && <DotWave size={47} speed={1} color="hsl(274,82%,60%)" />}
    {error && <Error/>}
    {data && (
        <WordContainer>
            <Left>
            <WordTitle>{data[0].word}</WordTitle>
            {data[0].phonetic && (
                <Phonetic>/ {data[0].phonetic} /</Phonetic>
            )}
            </Left>
            <Right>
                    <AudioIcon  ref={svgRef}
                     onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      src='/images/icon-play.svg' width="75" height="75" viewBox="0 0 75 75" aria-label='play-icon'
                        onClick={handlePlayAudio}>
                        <g  fillRule="evenodd" fill='hsl(274,82%,60%)'>
                            <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                            <path d="M29 27v21l21-10.5z"/>
                        </g>
                    </AudioIcon>
                    {audioError && <div>Error: Could not play audio</div>}
            </Right>
        </WordContainer>
            )}

        {data && (

            <DefinitionContainer>
                    <NounContainer>
                    <HeadingM>noun</HeadingM>
                    <BodyM>Meaning</BodyM>
                    {nounDefinitions && nounDefinitions.map((definition, index) => (
                        <List key={index}>
                            <ListMeanings>{definition.definition}</ListMeanings>
                        </List>
                            ))}
                    <SynonymContainer>
                        <BodyM>Synonym</BodyM>
                        <Synonyms>{data[0].meanings[0].synonyms.join(", ")}</Synonyms>
                    </SynonymContainer>    
                </NounContainer>
                <VerbContainer>
                    <HeadingM>verb</HeadingM>
                    {verbDefinitions && verbDefinitions.map((definition, index) => (
                        <List key={index}>
                        <ListMeanings>{definition.definition}</ListMeanings>
                        <Example>"{definition.example}"</Example>
                    </List>
                        ))}
                    
                </VerbContainer>

                <SourceContainer>
                    <SourceHeadingS>Source</SourceHeadingS>
                    <Source href={data[0].sourceUrls}>{data[0].sourceUrls}</Source>
                    <NewWindowIcon src='/images/icon-new-window.svg' width="14" height="14" viewBox="0 0 14 14" aria-label='source-icon'>
                        <path fill="none" stroke="#838383" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.09 3.545H2.456A1.455 1.455 0 0 0 1 5v6.545A1.455 1.455 0 0 0 2.455 13H9a1.455 1.455 0 0 0 1.455-1.455V7.91m-5.091.727 7.272-7.272m0 0H9m3.636 0V5"/>
                    </NewWindowIcon>
                </SourceContainer>
            </DefinitionContainer>
    )}
    </Container>
  )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`
const Form = styled.form`
    position: relative;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    padding-left: 10px;
    border-radius: 10px;
    background-color: hsl(0, 0%, 91%);
    border: solid 1px;
`
const SearchIcon = styled.svg`
    position: absolute;
    bottom: 12px;
    right: 10px;
`
const WordContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const Left = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const WordTitle = styled.h1`
    font-size: 64px;

    @media only screen and (max-width: 375px) {
    font-size: 48px;
  }
`
const Phonetic = styled.p`
    font-size: 20px;
    color: hsl(274,82%,60%);
`
const Right = styled.div`
    display: flex;
`
const AudioIcon = styled.svg`
    cursor: pointer;

    &:hover{
        fill: #000 !important;
    }
`
const DefinitionContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const NounContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const HeadingM = styled.p`
    font-size: 24px;
    font-weight: 800;
    font-style: italic;
`
const BodyM = styled.p`
    font-size: 18px;
    color: var(--secondary-text-color);
    `
const ListMeanings = styled.li`
    font-size: 14px;
`
const List = styled.ul`
    padding-left: 30px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    list-style: none;

    ${ListMeanings}::before{
        content: "• ";
        padding-right: 10px;
        font-weight: bold;
        color: var(--purple);
    }
`

const VerbContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const SynonymContainer = styled.div`
    display: flex;
    gap: 20px;
`
const Synonyms = styled.p`
    font-size: 18px;
    font-weight: 600;
    color: hsl(274,82%,60%);

    &:hover{
        text-decoration-line: underline;
        text-underline-offset: 5px;
    }
`
const Example = styled.p`
    font-size: 14px;
    color: var(--secondary-text-color);
`
const SourceContainer = styled.div`
    display: flex;
    gap: 10px;
    padding-bottom: 20px;
`
const SourceHeadingS = styled.p`
    font-size: 12px;
    color: var(--secondary-text-color);
    `
const Source = styled.a`
    font-size: 12px;
    color: var(--secondary-text-color);
    cursor: pointer;
`
const NewWindowIcon = styled.svg`
    width: 1.5%;

    @media only screen and (max-width: 375px) {
    width: 3%;
  }
`
const ErrorMessage = styled.span`
    color: hsl(0,100%,66%);
`

export default Dictionary