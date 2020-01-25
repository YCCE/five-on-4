import React from "react";

import "./login-view.styles.css";

const LoginView = ({loginCredentials, onHandleChange, onHandleSubmit}) => {
    const {email, password} = loginCredentials;
    return(
        <div className="login-view">
            <h1 className="login-title">Login</h1>
            <form className="login-form" name="form" onSubmit={onHandleSubmit}>
                <label className="login-label-email" htmlFor="email">
                    Email
                </label>
                <input 
                    className="login-email"
                    required id="email" name="email" 
                    type="email" onChange={onHandleChange}
                    value={email}
                />
                <label className="login-label-password" htmlFor="password">
                    Password
                </label>
                <input 
                    className="login-password"
                    required id="password" name="password" 
                    type="password" onChange={onHandleChange}
                    value={password} 
                />
                <input className="login-button" type="submit" value="Login"/>
            </form>    
        </div>
    )
}

export default LoginView;