import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
    position: absolute;
	top:0;
	bottom: 0;
	left: 0;
	right: 0;
  	
	margin: auto;
    width: 30rem;
    height: 20rem;
    background-color: cyan;
    border-radius: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 4rem 4rem;
    box-sizing: border-box;

    input[type="password"], input[type="text"] {
        box-sizing: border-box;
        width: 50%;
        border: none;
        padding: 0.5rem;
        border-radius: 1.5rem;
        transition: width 0.5s;

        &:focus {
            outline: none;
            width: 70%;
        }
    }
`;

export default class Login extends React.Component {
    usernameRef = React.createRef();
    passwordRef = React.createRef();

    login = (e) => {
        e.preventDefault();
        this.props.login(this.usernameRef.current.value, this.passwordRef.current.value)
            .then(res => {
                let route = '/';
                if (this.props.location.state) {
                   route = this.props.location.state.from || '/';
                }
                this.props.history.push(route);
            });
    }

    render() {
        return (
            <StyledForm onSubmit={this.login}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    ref={this.usernameRef}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    ref={this.passwordRef}
                    required
                />
                <input
                    type="submit"
                    name="login"
                    value="Login"
                />
            </StyledForm>
        )
    }

}