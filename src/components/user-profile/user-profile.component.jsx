import React from "react";

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

    return (
        <div className="user-profile">
            <h1>User Profile Component</h1>
            <h2>User Details</h2>
            <p>name: <strong>{user_name}</strong></p>
            <p>id: <strong>{user_id}</strong></p>
            <p>email address: <strong>{user_email}</strong></p>
            <p>account created: <strong>{user_created}</strong></p>
            <h2>Match Contribution</h2>
            <p>reliability: <strong>{(user_attended_matches.length/user_signed_up_matches.length)}</strong></p>
            <p>won games: <strong>{(user_matches_won_as_home.concat(user_matches_won_as_away).length/user_attended_matches.length)*100}%</strong></p>
            <p>goals per game: <strong>{user_scored_in_matches.length/user_attended_matches.length}</strong></p>
            <h2>Match Details</h2>
            <p>signed up matches so far: <strong>{user_signed_up_matches.length}</strong></p>
            {/* here is should show name or date better even, and be able to link to it. some kind of object sent from db to front end holding this data? yes*/}
            <ul>
                {
                 user_signed_up_matches.map(match => {
                     return (
                <li key={match.match_id}>
                    <p>{match.match_name} on {new Date(match.match_date).toDateString()}</p>
                </li>)
                 })   
                }
            </ul>

            <p>attended matches so far: <strong>{user_attended_matches.length}</strong></p>
            <ul>
                {
                 user_attended_matches.map(match => {
                     return (
                <li key={match.match_id}>
                    <p>{match.match_name} on {new Date(match.match_date).toDateString()}</p>
                </li>)
                 })   
                }
            </ul>

            <p>goals scored so far: <strong>{user_scored_in_matches.reduce((acc, val) => {return acc + val.match_goals_scored},0)}</strong></p>
            <ul>
                {
                    user_scored_in_matches.map(match => {
                     return (
                <li key={match.match_id}>
                    <p>{match.match_name} on {new Date(match.match_date).toDateString()}, goals: {match.match_goals_scored}</p>
                </li>)
                 })   
                }
            </ul>
{/* there is an issue here of player being able to play for both home and away. i play to leave it that way */}
            <p>total matches won : <strong>{user_matches_won_as_home.concat(user_matches_won_as_away).length}</strong></p>
            <ul>
                {
                    user_matches_won_as_home.concat(user_matches_won_as_away).map(match => {
                     return (
                <li key={match.match_id}>
                    <p>{match.match_name} on {new Date(match.match_date).toDateString()}</p>
                </li>)
                 })   
                }
            </ul>

            <p>total matches lost : <strong>{user_matches_lost_as_home.concat(user_matches_lost_as_away).length}</strong></p>
            <ul>
                {
                    user_matches_lost_as_home.concat(user_matches_lost_as_away).map(match => {
                     return (
                <li key={match.match_id}>
                    <p>{match.match_name} on {new Date(match.match_date).toDateString()}</p>
                </li>)
                 })   
                }
            </ul>

            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>
            <p><strong>{}</strong></p>

        </div>
    )
}

export default UserProfile;