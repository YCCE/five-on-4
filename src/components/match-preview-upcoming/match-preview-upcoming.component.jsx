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
        <div className="match-preview-upcoming">
            <img className="match-preview-image" src="https://dummyimage.com/355x174/123/fff.jpg&text=placeholder+image,+courtesy+of+https://dummyimage.com/" alt="generic atletico madrid photo"/>
            
            <div className="match-preview-info">
                <h1 className="match-preview-name"><strong>{match_name}</strong></h1>
                <p className="match-preview-date">>
                    <span> {new Intl.DateTimeFormat("en-GB", {weekday: "long"}).format(new Date(match_date_start))}</span>
                    <span>, {new Date(match_date_start).toDateString().slice(4)}</span>  
                </p>
                <p className="match-preview-time">>
                    <span> {new Date(match_date_start).toTimeString().slice(0,5)} - </span>
                    <span>{new Date(match_date_end).toTimeString().slice(0,5)}</span>
                </p>
                <p className="match-preview-venue">> at {match_venue}</p>
                <p className="match-preview-signed-up"><strong>{match_players_signed_up} players joined so far!</strong></p>
                <div className="match-preview-buttons">
                    {user_id? (   
                    <JoinUnjoinMatch className="match-preview-join"
                        user_id={user_id}
                        match_id={match_id} 
                        user_signed_up_matches={user_signed_up_matches}
                        fetchEndPoint={fetchEndPoint}
                        setStateMatches={setStateMatches} 
                        setStatePlayerMatches={setStatePlayerMatches} 
                        setStateGlobalMessage={setStateGlobalMessage}
                    />): <Link to="/login">Login to Join</Link>}
                    <Link to={`/detailedmatch/${match_id}`}>Match Details</Link>
                </div>
            </div>
        </div>
    )
}
export default MatchPreviewUpcoming;