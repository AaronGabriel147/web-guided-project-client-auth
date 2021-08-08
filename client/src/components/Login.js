import React from 'react';
// import axios from 'axios';

import { axiosWithAuth } from '../utils/axiosWithAuth';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  /* SEE IF THIS STILL WORKS AFTEWR I CHANGED IT TO REQ */
  
  // get is getting something
  // post is when you give something to the server
  // this.state.credentials is grabbing the handleChanger up above.
  login = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", this.state.credentials) // once connected to the server you are gicing then the state.
      .then(req => {
        // setItem is saving a key value pair into localStorage. 
        // res is what is returned by the server.
        // res.data.token is accessing a specific piece of data that was returned from the server. Most notably the token!
        localStorage.setItem('token', req.data.token)
        console.log("Login.js: login handler", req)
        // history is avail through <Route>. 
        // push() is a function that allows us to push a new Route into our browser. It saves the base URL, and adds onto the path.
        // So we are adding /protected to the pre-existing URL.
        this.props.history.push('/protected');
      })
      .catch((err) =>  console.log("We do not recognize these credentials. ", err));
  };

// use axios to make post request
// if successful, log token
// if req is error, log error


// The data that is .logged, looks like this:
// data:
// role: "editor"
// token: "ahuBHejkJJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA07i73Gebhu98"
// username: "lambdaSchool"

  render() {
    // console.log('render of Login.js ', this.state.credentials)
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;