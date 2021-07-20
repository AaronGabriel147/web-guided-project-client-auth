import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Login from './components/Login';
import GasPrices from './components/GasPrices';
import axiosWithAuth from './utils/axiosWithAuth';

const UserHeader = ()=> {
  return(<div>
    <Link to="/protected">Protected Page</Link>
  </div>);
}

function App() {
  const logout = () => {
    axiosWithAuth()
    .post('/logout')
    .then(res => {
      localStorage.removeItem('token');
      localStorage.setItem('username');
      localStorage.setItem('role');
      window.location.href = "/login";
    })
    .catch(err => {
      console.log(err);
    })
  };


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            {localStorage.getItem('token') ? <UserHeader/> : <div></div>}
          </li>
        </ul>

        <Switch>
          <Route exact path="/protected" component={GasPrices} />

          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
