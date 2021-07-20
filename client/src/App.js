import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import GasPrices from './components/GasPrices';

import axiosWithAuth from './utils/axiosWithAuth';
import axios from 'axios';

const UserHeader = (props)=> {
  return(<div>
    <Link to="/protected">Protected Page</Link>
    { props.userInfo.role == "admin" ? <div>Boss Person</div> : <div>Normal Dude</div>}
  </div>);
}

function App() {
  const [userInfo, setUserInfo] = useState({
    authenticated: false,
    username: "",
    role: ""
  });

  const logout = () => {
    axiosWithAuth()
    .post('/logout')
    .then(res => {
      localStorage.removeItem('token');

      setUserInfo({
        authenticated: false,
        username: "",
        role: ""
      });

      window.location.href = "/login";
    })
    .catch(err => {
      console.log(err);
    })
  };

  const login = (credentials) => {
    axios
      .post('http://localhost:5000/api/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token);

        setUserInfo({
          authenticated: true,
          username: res.data.username,
          role: res.data.role
        });
      })
      .catch(err=>{
        console.log(err);
      })
  }


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            { !userInfo.authenticated && <Link to="/login">Login</Link> }
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            { userInfo.authenticated && <UserHeader userInfo={userInfo}/> }
          </li>
        </ul>

        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} />

          <Route path="/login" render={(props)=> {
            return <Login {...props} login={login}/>
          }} />

          {/* <Route path="/login">
            <Login login={login}/>
          </Route> */}

          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
