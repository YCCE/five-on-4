import React from "react";
import { Redirect } from "react-router-dom";

import "./register.styles.css";


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: {
                name: "",
                email: "",
                password: "",
            },
            redirect: null,
            message: null,
        }
    }
    onLoginChangeHandler = (event) => {
        this.setState({login: Object.assign({}, this.state.login, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        // accessing register endpoint
        this.props.onEndPointFetch("post", "/register", this.state.login)
        .then(response => {
            if(response.message === "user registered successfully"){
                // setting state in app.js of currently logged user 
                console.log(response);
                this.props.setStateLoggedUser(response.data.user_id, response.data.user_name, response.data.user_email, response.data.joined_matches);
                this.setState({redirect: "/"})
            }
            else{
                console.log(response);
                this.setState({message: response.message})
            }
        })
        .catch(console.log);
    } 

    render(){
        return(
            <div className="register">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="name">Name</label>
                    <input required id="name" name="name" type="name" value={this.state.login.name} onChange={this.onLoginChangeHandler}/>

                    <label htmlFor="email">Email</label>
                    <input required id="email" name="email" type="email" value={this.state.login.email} onChange={this.onLoginChangeHandler}/>

                    <label htmlFor="password">Password</label>
                    <input required id="password" name="password" type="password" value={this.state.login.password} onChange={this.onLoginChangeHandler}/>

                    <input type="submit" value="Register"/>
                </form>

                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
                
            </div>
        )
    }
}

export default Register;