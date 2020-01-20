import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-upcoming.styles.css";
import JoinUnjoinMatch from "../join-unjoin-match/join-unjoin-match.component";



const MatchPreviewUpcoming = (props) => {
    const {
        match_id, 
        match_name, 
        match_date_start, 
        match_date_end, 
        match_venue, 
        match_players_signed_up, 
        user_id, 
        user_signed_up_matches, 
        fetchEndPoint,
        setStateMatches, 
        setStatePlayerMatches, 
        setStateGlobalMessage,
    } = props;

    return (
        <div>
            <h2>{match_name}</h2>
            <p>starts: {new Date(match_date_start).toLocaleString()}</p>
            <p>ends: {new Date(match_date_end).toLocaleString()}</p>
            <p>players signed up: {match_players_signed_up}</p>
            <p>venue: {match_venue}</p>
            <Link to={`/detailedmatch/${match_id}`}>
                <input type="button" value="Details"/>
            </Link>
            {user_id? (   
            <JoinUnjoinMatch
                user_id={user_id}
                match_id={match_id} 
                user_signed_up_matches={user_signed_up_matches}
                fetchEndPoint={fetchEndPoint}
                setStateMatches={setStateMatches} 
                setStatePlayerMatches={setStatePlayerMatches} 
                setStateGlobalMessage={setStateGlobalMessage}
            />): 
            <Link to="/login"><button>Login to join</button></Link>}
            {/* to be removed */}
            <p>// to be removed // match id: {match_id}</p>
        </div>
    )
}
export default MatchPreviewUpcoming;