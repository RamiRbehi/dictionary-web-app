import axios from 'axios'
import React, { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import Error from './Error'

const Dictionary = ({font}) => {
    const [word, setWord] = useState("keyboard");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const [isEmptyInput, setIsEmptyInput] = useState(false);

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
        if (word === '') {
            setIsEmptyInput(false);
            return;
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
        const audio = new Audio(data[0].phonetics[0].audio);
        audio.play()
            .catch((error) => {
                setAudioError(true);
            })
      }

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
    <Container style={{fontFamily: font }}>
        <Form onSubmit={handleSearch}>
            <Input style={{fontFamily: font,
                border: isEmptyInput ? 'solid 1px var(--redish)' : 'solid 1px var(--purple)'
                }}
                 placeholder='Search for any word...'
                 value={word}
                 onChange={(e) => {
                    setWord(e.target.value)
                    setIsEmptyInput(true)
                    }}
                 />
            <SearchIcon src='/images/icon-search.svg'
                onClick={handleSearch}
                />
                {isEmptyInput && <ErrorMessage>Whoops, can't be empty...</ErrorMessage>}
        </Form>

    {loading && <div>Loading...</div>}
    {error && <Error/>}
    {data && (
        <WordContainer>
            <Left>
            <WordTitle>{data[0].word}</WordTitle>
            {data[0].phonetics[0].text && (
                <Phonetic>/ {data[0].phonetics[0].text} /</Phonetic>
            )}
            </Left>
            <Right>
                    <AudioIcon  ref={svgRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} width="75" height="75" viewBox="0 0 75 75" src='/images/icon-play.svg' onClick={handlePlayAudio}>
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
                        <Synonyms>{data[0].meanings[0].synonyms}</Synonyms>
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
                    <NewWindowIcon src='/images/icon-new-window.svg'/>
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
    background-color: var(--Input-bg);
    /* border: solid 1px var(--purple); */

    &:focus{
        border: solid 1px var(--purple);
    }
`
const SearchIcon = styled.img`
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
`
const Phonetic = styled.p`
    font-size: 20px;
    color: var(--purple);
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
    color: var(--purple);

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
const NewWindowIcon = styled.img`
    width: 1.5%;
`
const ErrorMessage = styled.span`
    color: var(--redish);
`

export default Dictionary