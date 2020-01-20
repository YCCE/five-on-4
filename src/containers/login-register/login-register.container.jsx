import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import "./login-register.styles.css";

import LoginView from "../../components/login-view/login-view.component";
import RegisterView from "../../components/register-view/register-view.component";

class LoginRegister extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            credentials: {
                name: "",
                email: "",
                password: "",
            },
            redirect: null,
        }
    }
// TODO // should I unnest state?
    onHandleChange = (event) => {
        this.setState({credentials: Object.assign({}, this.state.credentials, {[event.target.name]: event.target.value})})
    }
    onHandleSubmit = (event) => {
        const {setStateLoggedUser, fetchEndPoint, setStateGlobalMessage} = this.props;
        const {name, email, password} = this.state.credentials;
        const {pathname} = this.props.location;

        event.preventDefault();
        pathname==="/register"? fetchEndPoint("post", "/register", {name, email, password}): fetchEndPoint("post", "/login", {email, password})
        .then(response => {
            if(response.message === "user logged in successfully" || response.message === "new user successfully registered"){
                setStateLoggedUser(response.data);
                this.setState({redirect: "/"});
                return;
            }
            setStateGlobalMessage(response.message);
        })
        .catch(console.log); 
    }
    render(){
        const {name, email, password} = this.state.credentials;
        const {pathname} = this.props.location;

        return(
            <div className="login">
                {pathname==="/register"? <RegisterView 
                    registerCredentials={name, email, password}
                    onHandleChange={this.onHandleChange}
                    onHandleSubmit={this.onHandleSubmit}
                />:
                (<LoginView 
                    loginCredentials={email, password}
                    onHandleChange={this.onHandleChange}
                    onHandleSubmit={this.onHandleSubmit}
                />)}
                {this.state.redirect && <Redirect to={this.state.redirect} />}
            </div>
        )
    }
}

export default withRouter(LoginRegister);