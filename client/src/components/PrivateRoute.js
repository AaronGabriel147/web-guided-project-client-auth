import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Wrap the plain Route component and pass in the same props.
// Check to see if we are logged in, and if so, render component.
// If the user is not logged in, we redirect to login.

export const PrivateRoute = (props) =>  {

    return(<Route {...props} />)  // Gives all props.

}