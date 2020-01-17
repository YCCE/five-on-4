import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = ({user_name, user_signed_up_matches, setStateLoggedUser}) => (
    <div className="header">
        <nav className="header-navigation">
            <ul className="navigation-section">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/matches">Matches</Link></li>
                <li><Link to="/creatematch">Create Match</Link></li>
            </ul>
            <ul className="navigation-section">
                {user_name? 
                    (<>
                        <li>Hello,  
                        <Link to="/profile"> {user_name.charAt(0).toUpperCase()+user_name.slice(1)}</Link>
                        ! Signed up matches: {user_signed_up_matches? user_signed_up_matches.length: 0}</li>
                        <li 
                        onClick={setStateLoggedUser}>
                            <Link to="/">Logout</Link>
                        </li>
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