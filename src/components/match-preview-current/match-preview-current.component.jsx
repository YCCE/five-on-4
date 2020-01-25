import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-current.styles.css";

const MatchPreviewCurrent = ({match_id, match_name, match_date_end, match_venue, match_players_signed_up}) => {
    return (
        <div className="match-preview-current">
            <Link to={`/detailedmatch/${match_id}`}>
                <h1 className="match-current-name">{match_name}</h1>
            </Link>

            <p className="match-current-details">>
                <span> {match_players_signed_up} players</span>
                <span> at {match_venue}</span>
                <span> until {new Date(match_date_end).toTimeString().slice(0,5)}</span>
            </p>
        </div>
    )
}
export default MatchPreviewCurrent;