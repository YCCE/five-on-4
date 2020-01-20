import React from "react";

import "./match-detailed-content.styles.css";

const MatchDetailedContent = ({detailed_match}) => {
    const {
        match_id, 
        match_name, 
        match_date_start, 
        match_date_end,
        match_venue, 
        match_reported, 
        match_home_score, 
        match_away_score, 
        match_players_signed_up, 
        match_players_attended, 
        match_scorers, 
        match_home_team, 
        match_away_team
    } = detailed_match;

    return (
        <>
            <div className="detailed-match-basic">
                <h2>{match_name}</h2>
                <p>start: <strong>{new Date(match_date_start).toLocaleTimeString().slice(0,5)}, {new Date (match_date_start).toDateString()}</strong></p> 
                <p>end: <strong>{new Date(match_date_end).toLocaleTimeString().slice(0,5)}, {new Date (match_date_end).toDateString()}</strong></p> 
                <p>venue: <strong>{match_venue}</strong></p> 
                <p>players signed up:</p> 
                {match_players_signed_up? 
                (<ol>{match_players_signed_up.map(player => {
                    return <li key={player.user_id}><strong>{player.user_name}</strong></li>
                })}</ol>)
                :("no players have signed up yet.")}
            </div>

            {match_reported && (
            <div className="detailed-match-report">
                <h3>Match Report</h3>
                <p>players attended:</p>  
                <ol>{match_players_attended.map(player => {
                    return <li key={player.user_id}><strong>{player.user_name}</strong></li>
                })}</ol>
                <p>match score: HOME <strong>{match_home_score}</strong> - <strong>{match_away_score}</strong> AWAY</p>
                <p>home team:</p>
                <ol>{match_home_team.map(player => {
                    return <li key={player.user_id}><strong>{player.user_name}</strong></li>
                })}</ol>
                <p>away team:</p>
                <ol>{match_away_team.map(player => {
                    return <li key={player.user_id}><strong>{player.user_name}</strong></li>
                })}</ol>
                <p>scorers:</p>
{/* does this mutate the state? slice() i dont think so bc i am not changing the objet inside, i am just changing the surface array */}
                <ol>{match_scorers.slice().sort((a,b)=>b.user_goals - a.user_goals).map(player => {
                    return <li key={player.user_id}><strong>{player.user_name}</strong>: {player.user_goals} goal(s)</li>
                })}</ol>
            </div>)}
        </>
    )
}

export default MatchDetailedContent;