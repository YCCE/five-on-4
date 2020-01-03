import React from "react";

import "./login.styles.css";
import { matches_static, matches_dynamic, users } from "../../assets/database";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmitHandler = (event) => {
        event.preventDefault();

        const found_user = users.find(user => user.user_email === this.state.email && user.user_password === this.state.password);

        // this will be moved to the server, which will send this data to the front end as part of a response

        if(found_user){
            console.log("ok")

            const joined_matches = matches_dynamic.filter(match => match.users_signed_up.some(user => user === found_user.user_id))
            .map(match => match.match_id)

            this.props.setStateProperty("logged_user", {id: found_user.user_id, name: found_user.user_name, email: found_user.user_email, joined_matches: joined_matches})
        } else {
            console.log("no");
        }
    }

    
    render(){
        return(
            <div className="login">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="email">Email</label>
                    <input required id="email" name="email" type="email" value={this.state.email} onChange={this.onChangeHandler}/>

                    <label htmlFor="password">Password</label>
                    <input required id="password" name="password" type="password" value={this.state.password} onChange={this.onChangeHandler}/>

                    <input type="submit" value="Login"/>
                </form>
                
            </div>
        )
    }
}

export default Login;