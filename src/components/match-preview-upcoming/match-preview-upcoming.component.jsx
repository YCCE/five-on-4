import React from "react";
import { Link } from "react-router-dom";

import "./match-preview-upcoming.styles.css";

import JoinMatchButton from "../join-match-button/join-match-button.component";
import UnjoinMatchButton from "../unjoin-match-button/unjoin-match-button.component";

const MatchPreviewUpcoming = ({match_id, match_name, match_date_start, match_date_end, match_venue, match_players_signed_up, user_id, user_name, joined_matches, setStateMatches, onSetStatePlayerMatches, onEndPointFetch}) => {

    // this should probably be a function because it repeats in match detailed too
    const renderMatchAction = () => {
        if(joined_matches.includes(match_id)){
            return <UnjoinMatchButton
                        onEndPointFetch={onEndPointFetch}
                        match_id={match_id}
                        setStateMatches={setStateMatches}
                        user_id={user_id}
                        user_name={user_name}
                        onSetStatePlayerMatches={onSetStatePlayerMatches}
                    />
        }
        else{
            return <JoinMatchButton
                        onEndPointFetch={onEndPointFetch}
                        match_id={match_id}
                        setStateMatches={setStateMatches}
                        user_id={user_id}
                        user_name={user_name}
                        onSetStatePlayerMatches={onSetStatePlayerMatches}
                    />
        }
    }

    return (
        <div>
            <h2>{match_name}</h2>
            <p>starts: {new Date(match_date_start).toLocaleString()}</p>
            <p>ends: {new Date(match_date_end).toLocaleString()}</p>
            <p>players signed up: {match_players_signed_up}</p>
            <p>venue: {match_venue}</p>
            <Link to={`/match/${match_id}`}>
                <input type="button" value="Details"/>
            </Link>
            {user_id? renderMatchAction(): <Link to="/login"><button>Login to join</button></Link>}

            {/* to be removed */}
            <p>// to be removed // match id: {match_id}</p>
        </div>
    )
}
export default MatchPreviewUpcoming;