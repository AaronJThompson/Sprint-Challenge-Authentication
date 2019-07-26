import React from 'react';
import styled from 'styled-components';

const JokeList = styled.div`
    width: 70vw;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const Joke = styled.div`
    height: 10rem;
    margin-bottom: 2rem;
`;

export default function(props) {
    return (
        <JokeList>
            {
                props.jokes.map(joke => {
                    return (
                        <Joke>
                            <p>{joke.joke}</p>
                        </Joke>
                    )
                })
            }
        </JokeList>
    )
}