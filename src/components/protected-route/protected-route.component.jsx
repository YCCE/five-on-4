import React from "react";
import {Route, Redirect} from "react-router-dom";

const ProtectedRoute = (props) => {
    console.log(props)
    return(props.user_name? <div>{props.children}</div>: <Redirect to="/login"/>)
}
export default ProtectedRoute;