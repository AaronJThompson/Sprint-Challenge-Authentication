import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import authedAxios from './axios/axiosWithAuth';

const apiUrl = 'http://localhost:3300/api'

const createApiUrl = (...extentions) => {
  const url = apiUrl;
  return extentions.reduce((curPath, path) => `${curPath}/${path}`);
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jokes: []
    }
  }

  login = (username, password) => {
    return axios.post(createApiUrl('login'), {username, password})
      .then(res => {
        localStorage.setItem('token',res.body.token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  register = (username, password) => {
    return axios.post(createApiUrl('register'), {username, password})
      .catch(error => {
        console.log(error);
      });
  }

  render(){
    return (
      <div className="App">
      </div>
    );
  } 
}

export default App;
