import React from "react";
import { Link } from "react-router-dom";
import detailedImage from "./imagedetailed.jpg";


import "./match-detailed-content.styles.css";

const MatchDetailedContent = ({detailed_match, children, user_id}) => {
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
    console.log(match_date_start)

    return (
        <div className="match-detailed-content">
            <img className="detailed-image" src="https://dummyimage.com/720x260/123/fff.jpg&text=placeholder+image,+courtesy+of+https://dummyimage.com/"/>
            <div className="detailed-match-info">
                <div className="detailed-match-basic">
                    <h1 className="detailed-match-name">{match_name}</h1>
                    <p className="detailed-match-date-start">From: 
                        <span> {new Intl.DateTimeFormat("en-GB", {weekday: "long"}).format(new Date(match_date_start))}</span>
                        <span>, {new Date(match_date_start).toDateString().slice(4)}</span>
                    </p>
                    <p className="detailed-match-date-end">To: 
                        <span> {new Intl.DateTimeFormat("en-GB", {weekday: "long"}).format(new Date(match_date_end))}</span>
                        <span>, {new Date(match_date_end).toDateString().slice(4)}</span>
                    </p>
                    <p className="detailed-match-venue">Location: {match_venue}</p>
                    <div className="match-detailed-basic-buttons">
                        {children}
                            <Link to={`/updatematch/${match_id}`}>
                                {user_id? "Edit": "Login to edit"}
                            </Link>
                    </div>
                    <p className="detailed-players-part-title">Players Joined:</p>
                    <ol className="detailed-player-list">
                        {match_players_signed_up.map(player => <li key={player.user_id}>{player.user_name}</li>)}
                    </ol>
                </div>

                <div className="detailed-match-report">
                    <div className="report-set-button"><Link to={`/matchreport/${match_id}`}>Set Match Report</Link></div>
                    <p className="detailed-match-score"><strong>Score</strong>: HOME <span>{match_home_score}</span> - <span>{match_away_score}</span> AWAY</p>
                    <p className="detailed-players-part-title">Players Attended:</p>
                    <ol className="detailed-player-list">
                        {match_players_attended.map(player => <li key={player.user_id}>{player.user_name}</li>)}
                    </ol>
                    <p className="detailed-players-part-title">Home Team:</p>
                    <ol className="detailed-player-list">
                        {match_home_team.map(player => <li key={player.user_id}>{player.user_name}</li>)}
                    </ol>
                    <p className="detailed-players-part-title">Away Team:</p>
                    <ol className="detailed-player-list">
                        {match_away_team.map(player => <li key={player.user_id}>{player.user_name}</li>)}
                    </ol>
                    <p className="detailed-players-part-title">Scorers:</p>
                    <ol className="detailed-player-list">
                        {match_scorers.slice().sort((a,b) => b.user_goals - a.user_goals).map(player => <li key={player.user_id}>{player.user_name} - {player.user_goals} goal(s)</li>)}
                    </ol>

                </div>
                
            </div>

        </div>
    )
}

export default MatchDetailedContent;