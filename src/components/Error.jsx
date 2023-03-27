import React from 'react'
import styled from 'styled-components'
import ReactEmoji from 'react-emoji-render';

const Container = styled.div`
    padding: 120px 90px 0 90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`
const SadEmoji = styled.img`
`
const ErrorTitle = styled.h1`
`
const ErrorDesc = styled.p`
    text-align: center;
`

const Error = () => {
  return (
    <Container>
        <ReactEmoji text="😕" style={{ fontSize: '55px' }} />
        <ErrorTitle>No Definitions Found</ErrorTitle>
        <ErrorDesc>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.</ErrorDesc>
    </Container>
  )
}

export default Error