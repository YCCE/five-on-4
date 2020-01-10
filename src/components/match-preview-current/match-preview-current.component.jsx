import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-current.styles.css";

const MatchPreviewCurrent = ({match_id, match_name, match_date_start, match_date_end, match_venue, match_players_signed_up}) => {
    return (
        <div>
            <h2>{match_name}</h2>
            <p>started: {new Date(match_date_start).toLocaleString()}</p>
            <p>ends: {new Date(match_date_end).toLocaleString()}</p>
            <p>players signed up: {match_players_signed_up}</p>
            <p>venue: {match_venue}</p>
            <Link to={`/match/${match_id}`}>
                <input type="button" value="Details"/>
            </Link>

            {/* to be removed */}
            <p>// to be removed // match id: {match_id}</p>
        </div>
    )
}
export default MatchPreviewCurrent;