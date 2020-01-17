import React from "react";
import { Redirect } from "react-router-dom";

import "./login.styles.css";


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: {
                email: "",
                password: "",
            },
            redirect: null,
            message: null,
            logged_id: null,
        }
    }
// TODO    // i should probably unnest state. and everywhere else too!!
    onLoginChangeHandler = (event) => {
        this.setState({login: Object.assign({}, this.state.login, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.login);
        // fetching user login info
        this.props.onEndPointFetch("post", "/login", this.state.login)
        .then(response => {
            if(response.message === "user logged in successfully"){
                console.log(response);
                // setting state in app.js of currently logged user 
                this.props.setStateLoggedUser(response.data);
            }
            else{
                console.log(response);
// TODO         // THIS NEEDS TO GO TO GLOBAL MESSAGE STATE
                this.setState({message: response.message})
            }
        })
        .catch(console.log);
    } 

    render(){
        return(
            <div className="login">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="email">Email</label>
                    <input required id="email" name="email" type="email" value={this.state.login.email} onChange={this.onLoginChangeHandler}/>

                    <label htmlFor="password">Password</label>
                    <input required id="password" name="password" type="password" value={this.state.login.password} onChange={this.onLoginChangeHandler}/>

                    <input type="submit" value="Login"/>
                </form>

                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
                
            </div>
        )
    }
}

export default Login;