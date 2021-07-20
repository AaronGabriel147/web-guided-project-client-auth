import React from 'react';
import axios from 'axios';

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

  handleLogin = e => {
    e.preventDefault();
    //1. setup an axios request for our login endpoint
    //2. add our credentials into the request body.
    //3. If successful, add in the token into localStorage.
    //4. If no successful, console.log an error

    this.props.login(this.state.credentials);
    this.props.history.push("/protected");
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
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