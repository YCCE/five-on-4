import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = ({logged_user, setStateLoggedUser}) => (
    <div className="header">
        <nav className="header-navigation">
            <ul className="navigation-section">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/matches">Matches</Link></li>
                <li><Link to="/creatematch">Create Match</Link></li>
            </ul>
            <ul className="navigation-section">
                {logged_user.name? 
                    (<>
                        <li>Hello, {logged_user.name.charAt(0).toUpperCase()+logged_user.name.slice(1)}. Signed up matches: {logged_user.joined_matches.length}</li>
                        <li onClick={setStateLoggedUser}>Logout</li>
                    </>):
                    (<>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>)
                }
            </ul>
        </nav>
    </div>
)

export default Header;