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
    onChangeHandler = (event) => {
        this.setState({login: Object.assign({}, this.state.login, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.login);
        this.props.onEndPointFetch("post", "/login", this.state.login)
        .then(response => {
            if(response.message === "user logged in successfully"){

                this.props.setStateLoggedUser(response.data.id, response.data.name, response.data.email, response.data.joined_matches)

                // fetching and setting all joined matches for the user
                this.props.onEndPointFetch("get", `/joinedmatches/${response.data.id}`)
                .then(user_matches_response => {
                    if(user_matches_response.message === "user matches fetched successfully"){
                        this.props.onSetStatePlayerMatches(user_matches_response.data);
                        this.setState({message: null, redirect: "/"})
                    }
                    else{
                        this.setState({message: user_matches_response.message})
                    }
                })
            }
            else{
                this.setState({message: response.message})
            }
        })
        .catch(console.log);
        // logic to populate user's matches
        // no need for full matches?

        this.props.onEndPointFetch("get", `/joinedmatches/${this.state.logged_id}`)
        .then(console.log);
    } 

    render(){
        return(
            <div className="login">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="email">Email</label>
                    <input required id="email" name="email" type="email" value={this.state.login.email} onChange={this.onChangeHandler}/>

                    <label htmlFor="password">Password</label>
                    <input required id="password" name="password" type="password" value={this.state.login.password} onChange={this.onChangeHandler}/>

                    <input type="submit" value="Login"/>
                </form>

                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
                
            </div>
        )
    }
}

export default Login;