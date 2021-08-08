import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Login from './components/Login';
import GasPrices from './components/GasPrices';
// import axios from 'axios'; // No longer needed.
import { axiosWithAuth } from './utils/axiosWithAuth';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  const logout = () => {
    axiosWithAuth()
      .post('/logout')
      .then(res => {
      // console.log("🚀 ~ file: App.js ~ line 15 ~ log?out ~ res", res)
        localStorage.removeItem('token') // this deletes token from the localStorage in the browser.
      })
      .catch(err => console.log('app.js: logout: catch error ', err))

  }; 

  // Switch will grab whatever matches first, and nothing else.
  // Route gives us all kinds of extra stuff. if we were to log is out, we will see things like "history." Route gives us special accesses.
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
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} /> {/* This is connected to PrivateRoute.js */}
          <Route path="/login" component={Login} />
          <Route component={Login} /> {/* ??? Same as above line ??? */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;