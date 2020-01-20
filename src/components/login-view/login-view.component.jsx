import React from "react";

import "./login-view.styles.css";

const LoginView = ({loginCredentials, onHandleChange, onHandleSubmit}) => {
    const {email, password} = loginCredentials;
    return(
        <div className="login">
            <form name="form" onSubmit={onHandleSubmit}>
                <label htmlFor="email">
                    Email
                </label>
                <input 
                    required id="email" name="email" 
                    type="email" onChange={onHandleChange}
                    value={email}
                />
                <label htmlFor="password">
                    Password
                </label>
                <input required id="password" name="password" 
                    type="password" onChange={onHandleChange}
                    value={password} 
                />
                <input type="submit" value="Login"/>
            </form>    
        </div>
    )
}

export default LoginView;