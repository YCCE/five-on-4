import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = ({user_name, user_signed_up_matches, setStateLoggedUser, children}) => (
    <div className="header">
        <nav className="header-navigation">
            <ul className="navigation-section">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/matches">Search Matches(X)</Link></li>
                <li><Link to="/creatematch">Create Match</Link></li>
            </ul>
            <ul className="navigation-section">
                {user_name? 
                    (<>
                        <li className="header-name">
                                <Link to="/profile">{user_name.charAt(0).toUpperCase()+user_name.slice(1)} |  Matches Joined: {user_signed_up_matches? user_signed_up_matches.length: 0}
                                </Link>
                        </li>
                        <li className="header-logout" 
                        onClick={setStateLoggedUser}>
                            <Link to="/">Logout</Link>
                        </li>
                    </>):
                    (<> 
                        <li className="header-login"><Link to="/login">login</Link></li>
                        <li className="header-register"><Link to="/register">register</Link></li>
                    </>)
                }
            </ul>
        </nav>
        {children}
    </div>
)

export default Header;