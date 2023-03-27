import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import styled from 'styled-components'
import WordContext from '../../WordContext'
import { fetchDictionary } from '../DictionaryAPI'

const Container = styled.div`

`
const Form = styled.form`
    position: relative;
`
const Input = styled.input`
    width: 100%;
    height: 40px;
    border-radius: 10px;
    background-color: var(--Input-bg);
`
const SearchIcon = styled.img`
    position: absolute;
    bottom: 12px;
    right: 10px;
`

const Search = ({font}) => {
    const [search, setSearch] = useState("");
    const inputRef = useRef;

    // useEffect(() => {
    //     inputRef.current.focus()
    // }, []);

    const setWord = useContext(WordContext);

    const onChange = (e) => {
        setSearch(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // if (search ==="") {
        
        // }
        try {
            const data = await fetchDictionary(search);
            data?.[0] && setWord(data?.[0]);
            setSearch("");
        } catch (error) {
            console.log(error);
        }
    };

    console.log(setSearch);

  return (
    <div>
        <Form onSubmit={onSubmit}>
            <Input style={{fontFamily: font }}
                 placeholder='Search for any word...'
                 value={search}
                 onChange={onChange}

                 />
            <SearchIcon src='/images/icon-search.svg'
                />
        </Form>
    </div>
  )
}

export default Search