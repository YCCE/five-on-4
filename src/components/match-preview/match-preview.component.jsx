import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";

const renderSignupButton = (match, joined_matches) => {
    if(joined_matches.some(joined_match => joined_match === match.match_id)){
        return <button>Cancel attendance</button>
    }
    else{
        return <button>Join the match</button>
    }
}

const MatchPreview = ({match, joined_matches, logged_user}) => {

    return (
        <div>
            <h3>Match Preview Component</h3>
            <p>match name: {match.match_name}</p>

            <p>players signed up: {match.users_signed_up.length}</p>
            <p>date start: {new Date(match.date_start).toLocaleString()}</p>
            <Link to={`/match/${match.match_id}`}>
                <input type="button" value="Details"/>
            </Link>
            {joined_matches && logged_user.name? renderSignupButton(match, joined_matches): <Link to="/login"><button>Login to join the match</button></Link>}
        </div>
    )
}
export default MatchPreview;