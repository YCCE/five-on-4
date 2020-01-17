import React from "react";
import { Redirect } from "react-router-dom";

import "./register.styles.css";


class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            register: {
                user_name: "",
                user_email: "",
                user_password: "",
            },
            redirect: null,
            message: null,
        }
    }
// TO DO // make all handlers and such have the same name
    onRegisterChangeHandler = (event) => {
        this.setState({register: Object.assign({}, this.state.register, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        // accessing register endpoint
        this.props.onEndPointFetch("post", "/register", this.state.register)
        .then(register_response => {
            if(register_response.message === "new user successfully registered"){
                // setting state in app.js of currently logged user 
                console.log(register_response);
                this.props.setStateLoggedUser(register_response.data);
                this.setState({redirect: "/"})
            }
            else{
                console.log(register_response.message);
// TO DO        // SET MESSAGE TO GLOBAL STATE
                this.setState({message: register_response.message})
            }
        })
        .catch(console.log);
    } 

    render(){
        return(
            <div className="register">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="user_name">Name</label>
                    <input required id="user_name" name="user_name" type="text" value={this.state.register.user_name} onChange={this.onRegisterChangeHandler}/>

                    <label htmlFor="user_email">Email</label>
                    <input required id="user_email" name="user_email" type="email" value={this.state.register.user_email} onChange={this.onRegisterChangeHandler}/>

                    <label htmlFor="user_password">Password</label>
                    <input required id="user_password" name="user_password" type="password" value={this.state.register.user_password} onChange={this.onRegisterChangeHandler}/>

                    <input type="submit" value="Register"/>
                </form>

                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
                
            </div>
        )
    }
}

export default Register;