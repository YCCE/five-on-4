import React from "react";

import "./register-view.styles.css";

const RegisterView = ({registerCredentials, onHandleChange, onHandleSubmit}) => {
    const {name, email, password} = registerCredentials;
    return(
        <div className="login">
            <form name="form" onSubmit={onHandleSubmit}>
                <label htmlFor="name">
                    name
                </label>
                <input 
                    required id="name" name="name" 
                    type="text" onChange={onHandleChange}
                    value={name}
                />
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
                <input type="submit" value="Register"/>
            </form>    
        </div>
    )
}

export default RegisterView;