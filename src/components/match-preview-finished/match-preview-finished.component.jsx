import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-finished.styles.css";


const MatchPreviewFinished = ({match_id, match_name, match_date_end, match_home_score, match_away_score}) => {
    return (

        <div className="match-preview-finished">
            <Link to={`/detailedmatch/${match_id}`}>
                <h1 className="match-finished-name">{match_name}</h1>
            </Link>

            <p className="match-finished-details">> ended 
                <span> {match_home_score} - </span>
                <span> {match_away_score} </span>
                <span> on {new Date(match_date_end).toDateString().slice(4)}</span>
                <span> at {new Date(match_date_end).toTimeString().slice(0,5)}</span>
            </p>
        </div>






        // <div>
        //     <h2>{match_name}</h2>
        //     <p>ended: {new Date(match_date_end).toLocaleString()}</p>
        //     <p>players attended: {match_players_attended}</p>
        //     <p>venue: {match_venue}</p>
        //     <Link to={`/detailedmatch/${match_id}`}>
        //         <input type="button" value="Details"/>
        //     </Link>

        //     {/* to be removed */}
        //     <p>// to be removed // match id: {match_id}</p>
        // </div>
    )
}
export default MatchPreviewFinished;