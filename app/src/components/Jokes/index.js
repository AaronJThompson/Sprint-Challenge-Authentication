import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import authedAxios from '../../axios/axiosWithAuth';

const JokeList = styled.div`
    width: 70vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const Joke = styled.div`
    height: 10rem;
    margin-bottom: 2rem;
    display:flex;
    justify-content: center;
    align-items: center;

    background: cyan;
    border-radius: 2rem;

    p{
        text-align:center;
    }
`;

export default function(props) {
    const [jokes, setJokes] = useState([]);

    useEffect(() => {
        authedAxios().get('http://localhost:3300/api/jokes')
            .then(res => {
                setJokes(res.data);
            });
    }, [])
    return (
        <JokeList>
            {
                jokes.map(joke => {
                    return (
                        <Joke key={joke.id}>
                            <p>{joke.joke}</p>
                        </Joke>
                    )
                })
            }
        </JokeList>
    )
}