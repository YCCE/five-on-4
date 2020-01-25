import React from "react";

import "./register-view.styles.css";

const RegisterView = ({registerCredentials, onHandleChange, onHandleSubmit}) => {
    const {name, email, password} = registerCredentials;
    return(
        <div className="register-view">
            <h1 className="register-title">Register</h1>
            <form className="register-form" name="form" onSubmit={onHandleSubmit}>
                <label className="register-label-name" htmlFor="name">
                    Name
                </label>
                <input 
                    className="register-name"
                    required id="name" name="name" 
                    type="text" onChange={onHandleChange}
                    value={name}
                />
                <label className="register-label-email" htmlFor="email">
                    Email
                </label>
                <input 
                    className="register-email"
                    required id="email" name="email" 
                    type="email" onChange={onHandleChange}
                    value={email}
                />
                <label className="register-label-password" htmlFor="password">
                    Password
                </label>
                <input 
                    className="register-password"
                    required id="password" name="password" 
                    type="password" onChange={onHandleChange}
                    value={password} 
                />
                <input className="register-button" type="submit" value="Register"/>
            </form>    
        </div>
    )
}

export default RegisterView;