import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-finished.styles.css";


const MatchPreviewFinished = ({match_id, match_name, match_date_start, match_date_end, match_venue, match_players_attended}) => {
    return (
        <div>
            <h2>{match_name}</h2>
            <p>ended: {new Date(match_date_end).toLocaleString()}</p>
            <p>players attended: {match_players_attended}</p>
            <p>venue: {match_venue}</p>
            <Link to={`/match/${match_id}`}>
                <input type="button" value="Details"/>
            </Link>

            {/* to be removed */}
            <p>// to be removed // match id: {match_id}</p>
        </div>
    )
}
export default MatchPreviewFinished;