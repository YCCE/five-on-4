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
    console.log(match_scorers);
    console.log(matchReport);
    return(
        <div className="report-match-content">
            <h1 className="report-match-title">Match Report</h1>




            {/* <div className="report-match-inner-grid"> */}
            {/* not sure about this way making grod
            prolly better to do it for each ul
            li is rows, inputs are columns */}

                <form className="report-match-form" onSubmit={onHandleSubmit}>
                    <h1 className="report-match-part-title">Players Participation</h1>

                    <ol className="report-match-player-list">
                        <p className="report-match-label report-match-inner-flex">
                            <label className="report-match-player-name"></label>
                            <label className="report-match-player-attended">Attended</label>
                            <label className="report-match-player-home">Home Team</label>
                            <label className="report-match-player-away">Away Team</label>
                            <label className="report-match-player-goals">Goals Scored</label>
                        </p>
                        {match_players_signed_up.map(player => 
                        <li 
                            className="report-match-inner-flex" 
                            key={player.user_id}>
                            <span className="report-match-player-name">{player.user_name} </span>
                            <input className="report-match-player-attended"
                                type="checkbox"
                                id={`match_players_attended-${player.user_id}`}
                                data-playerid={player.user_id}
                                name="match_players_attended"
                                checked={match_players_attended.some(playerAttended => playerAttended.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            <input className="report-match-player-home"
                                type="checkbox"
                                id={`match_home_team-${player.user_id}`} 
                                data-playerid={player.user_id}
                                name="match_home_team"
                                checked={match_home_team.some(playerHome => playerHome.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            <input className="report-match-player-away"
                                type="checkbox"
                                id={`match_away_team-${player.user_id}`}
                                data-playerid={player.user_id}
                                name="match_away_team"
                                checked={match_away_team.some(playerAway => playerAway.user_id === player.user_id)}
                                onChange={onHandleChange}
                                />
                            <input className="report-match-player-goals goals-input"
                                type="number"
                                id={`match_scorers-${player.user_id}`}
                                min="0"
                                data-playerid={player.user_id}
                                name="match_scorers"
                                value={match_scorers.filter(scorer => scorer.user_id === player.user_id)[0].user_goals || 0}
                                onChange={onHandleChange}
                                />
                        </li>)}
                    </ol>
                    <h1 className="report-match-score-title">Score</h1>
                    <div className="report-match-score-flex">
                        <label className="report-match-home-label">Home Team:
                        <input 
                            className="report-match-home-input"
                            type="number"
                            id="match_home_score"
                            min="0"
                            name="match_home_score"
                            value={match_home_score || 0}
                            onChange={onHandleChange}
                        />
                        </label>
                        <label className="report-match-away-label">Away Team:
                        <input 
                            className="report-match-away-input"
                            type="number"
                            id="match_away_score"
                            min="0"
                            name="match_away_score"
                            value={match_away_score || 0}
                            onChange={onHandleChange}
                        />
                        </label>
                    </div>
                    <button className="report-match-submit-button">Submit Report</button>
                </form>
            
            {/* </div> */}




        </div>
    )
}

export default ReportMatchContent;