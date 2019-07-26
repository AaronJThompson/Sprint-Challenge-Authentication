import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    margin: auto auto;
    width: 20rem;
    height: 20rem;
    background-color: cyan;
    border-radius: 2rem;
`;

export default function Login(props) {
    function login(e) {
        let route = '/';
        if (this.props.location.state) {
           route = this.props.location.state.from || '/';
        }
        this.props.history.push(route);
    }

    return (
        <StyledForm>
            <input
                type="text"
                name="username"
                placeholder="Username"
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />
            <input
                type="submit"
                name="login"
                value="Login"
                required
            />
        </StyledForm>
    )
}