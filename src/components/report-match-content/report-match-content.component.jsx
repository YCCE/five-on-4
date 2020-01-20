import React from "react";

import "./report-match-content.styles.css";

const ReportMatchContent = ({matchReport, onHandleChange, onHandleSubmit}) => {
    const {
        match_players_signed_up,
        match_players_attended,
        match_scorers,
        match_home_team,
        match_away_team,
        match_home_score,
        match_away_score
    } = matchReport;
    return(
        <div>
            <h1>Match Report</h1>
            <form onSubmit={onHandleSubmit}>
                <h1>players signed up</h1>
                <ol>
                    {match_players_signed_up.map(player => 
                    <li key={player.user_id}>
                        <span>name: {player.user_name} </span>
                        <label>attended: 
                            {<input 
                                type="checkbox"
                                id={`match_players_attended-${player.user_id}`}
                                data-playerid={player.user_id}
                                name="match_players_attended"
                                checked={match_players_attended.some(playerAttended => playerAttended.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            } </label>
                            <label>home team: 
                            {<input 
                                type="checkbox"
                                id={`match_home_team-${player.user_id}`} 
                                data-playerid={player.user_id}
                                name="match_home_team"
                                checked={match_home_team.some(playerHome => playerHome.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            } </label>
                            <label>away team: 
                            {<input 
                                type="checkbox"
                                id={`match_away_team-${player.user_id}`}
                                data-playerid={player.user_id}
                                name="match_away_team"
                                checked={match_away_team.some(playerAway => playerAway.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            } </label>
                            <label>goals scored: 
                            {<input 
                                type="number"
                                id={`match_scorers-${player.user_id}`}
                                min="0"
                                data-playerid={player.user_id}
                                name="match_scorers"
                                value={match_scorers.filter(scorer => scorer.user_id === player.user_id)[0].user_goals}
                                onChange={onHandleChange}
                                />
                            } </label>
                    </li>)}
                </ol>
                <h1>score</h1>
                <label>Home Team:
                    <input 
                        type="number"
                        id="match_home_score"
                        min="0"
                        name="match_home_score"
                        value={match_home_score}
                        onChange={onHandleChange}
                    />
                </label>
                <label>Away Team:
                    <input 
                        type="number"
                        id="match_away_score"
                        min="0"
                        name="match_away_score"
                        value={match_away_score}
                        onChange={onHandleChange}
                    />
                </label>
                <br/>
                <button>Submit Report</button>
            </form>
        </div>
    )
}

export default ReportMatchContent;