import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";

const MatchPreview = ({match, logged_user}) => {


    return (
        <div>
            <h3>Match Preview Component</h3>
            <p>match name: {match.match_name}</p>

            <p>players signed up: {match.users_signed_up.length}</p>
            <p>date start: {new Date(match.date_start).toLocaleString()}</p>
            <Link to={`/match/${match.match_id}`}>
                <input type="button" value="Details"/>
            </Link>


        </div>
    )
}

export default MatchPreview;