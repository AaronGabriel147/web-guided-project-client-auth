import React from 'react';
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({component, ...rest}) => {
    console.log(rest);
    return <Route {...rest} render={()=> {
        return "Adafasdf"
    }}/>
}

export default PrivateRoute;