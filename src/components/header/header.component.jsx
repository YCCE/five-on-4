import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.css";

const Header = () => (
    <div className="header">
        <nav className="header-navigation">
            <ul className="navigation-section">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/matches">Matches</Link></li>
                <li><Link to="/creatematch">Create Match</Link></li>
            </ul>
            <ul className="navigation-section">
                <li><Link to="/login">Login</Link></li>
                <li>Logout</li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    </div>
)

export default Header;