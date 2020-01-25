import React from "react";
import { withRouter, Link } from "react-router-dom";

import "./user-profile.styles.css";

const UserProfile = (props) => {
    const {
        user_id,
        user_name,
        user_email,
        user_created,
        user_signed_up_matches,
        user_attended_matches,
        user_in_home_team,
        user_in_away_team,
        user_matches_won_as_home,
        user_matches_won_as_away,
        user_matches_lost_as_home,
        user_matches_lost_as_away,
        user_scored_in_matches} = props.logged_user;
    const {goBack} = props.history;

    return (
        <div className="user-profile">
            <p className="button-go-back" onClick={goBack}>Go Back</p>
            <div className="user-profile-grid">

                <div className="user-profile-view">

                    <h1 className="user-profile-title">Player Profile</h1>
                    
                    <h2 className="user-profile-info-section">Player Information</h2>
                    <p className="user-profile-info">Name: <span className="user-profile-info-value">{user_name}</span></p>
                    <p className="user-profile-info">Player ID: <span className="user-profile-info-value">{user_id}</span></p>
                    <p className="user-profile-info">Email Address: <span className="user-profile-info-value">{user_email}</span></p>
                    <p className="user-profile-info">Joined: <span className="user-profile-info-value">{user_created}</span></p>

                    <h2 className="user-profile-info-section">Team Contribution</h2>
                    <p className="user-profile-info">Match Attendance: <span className="user-profile-info-value">{(user_attended_matches.length/user_signed_up_matches.length).toPrecision(2)}</span></p>
                    <p className="user-profile-info">Matches Won: <span className="user-profile-info-value">{((user_matches_won_as_home.length+user_matches_won_as_away.length)/(user_attended_matches.length))*100}%</span></p>
                    <p className="user-profile-info">Goals per Match: <span className="user-profile-info-value">{(user_scored_in_matches.reduce((acc, val) => (acc + val.match_goals_scored),0)/user_attended_matches.length).toPrecision(2)}</span></p>

                    <h2 className="user-profile-info-section">Detailed Participation</h2>
                    <p className="user-profile-info">Matches Signed up For: <span className="user-profile-info-value">{user_signed_up_matches.length}</span></p>

                    <ul className="user-profile-info">
                        {user_signed_up_matches.map(match => 
                        (<li className="user-profile-info-list-value" key={match.match_id}>> 
                            <Link to={`/detailedmatch/${match.match_id}`}>  {match.match_name} on <span>{match.match_date}</span></Link>
                        </li>))}
                    </ul>




                    <p className="user-profile-info">Matches Attended: <span className="user-profile-info-value">{user_attended_matches.length}</span></p>

                    <ul className="user-profile-info">
                        {user_attended_matches.map(match => 
                        (<li className="user-profile-info-list-value" key={match.match_id}>>
                        <Link to={`/detailedmatch/${match.match_id}`}>  {match.match_name} on <span>{match.match_date}</span></Link>
                        </li>))}
                    </ul>

                    <p className="user-profile-info">Matches Won: <span className="user-profile-info-value">{user_matches_won_as_home.length+user_matches_won_as_away.length}</span></p>

                    <ul className="user-profile-info">
                        {user_matches_won_as_home.concat(user_matches_won_as_away).map(match => 
                        (<li className="user-profile-info-list-value" key={match.match_id}>>
                        <Link to={`/detailedmatch/${match.match_id}`}>  {match.match_name} on <span>{match.match_date}</span></Link>
                        </li>))}
                    </ul>

                    <p className="user-profile-info">Matches Lost: <span className="user-profile-info-value">{user_matches_lost_as_home.length+user_matches_lost_as_away.length}</span></p>


                    <ul className="user-profile-info user-profile-list">
                        {user_matches_lost_as_home.concat(user_matches_lost_as_away).map(match => 
                        (<li className="user-profile-info-list-value" key={match.match_id}>>
                        <Link to={`/detailedmatch/${match.match_id}`}>  {match.match_name} on <span>{match.match_date}</span></Link>
                        </li>))}
                    </ul>                    


                    <p className="user-profile-info">Total Goals: <span className="user-profile-info-value">{user_scored_in_matches.reduce((acc, val) => (acc + val.match_goals_scored),0)}</span></p>

                    <ul className="user-profile-info">
                        {user_scored_in_matches.map(match => 
                        (<li className="user-profile-info-list-value" key={match.match_id}>> 
                        <Link to={`/detailedmatch/${match.match_id}`}>  {match.match_name} on <span>{match.match_date}</span></Link> - 
                        <span>{match.match_goals_scored} goals </span>
                        </li>))}
                    </ul>

                </div>

            </div>
        </div>
    )
}

export default withRouter(UserProfile);