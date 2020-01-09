import React from "react";

import "./user-profile.styles.css";
import { useStore } from "react-redux";

const UserProfile = (props) => {
    const { id, name, email, joined_matches } = props.logged_user;
    // lets just calculate past signed up matches
    const past_signed_up_matches = joined_matches.filter(match => {
        return new Date(match.date_end) < Date.now()
    });
    // and then calculate past attended matches
    // this data should also be in joined matches array because i have full matches there
    const past_attended_matches = joined_matches.filter(match => {
        return (new Date(match.date_end) < Date.now()) && (match.users_attended.includes(id))
    })
    // calculate future matches
    const future_signed_up_matches = joined_matches.filter(match => {
        return (new Date(match.date_start) > Date.now())
    })
    // calculate current signed up matches
    const current_signed_up_matches = joined_matches.filter(match => {
        return new Date(match.date_start) < Date.now() && new Date(match.date_end) > Date.now()
    })
    // calculate all goals ever
    // merge all home and away scorers 

    const total_goals = joined_matches.map(match => {
        return match.home_scorers.concat(match.away_scorers);
    }).flat().filter(scorer => {
        return scorer === id;
    }).length;

    return (
        <div className="user-profile">
            <h1>User Profile Component</h1>
            <p>Player Name: <strong>{name}</strong></p>
            <p>Total Past Matches Signed Up For: {past_signed_up_matches.length}
            {/* so here map through joined matches to show only matches that were in the past and that were attended */}
                {
                    console.log(joined_matches)
                }
            </p>
            <p>Total Past Matches Attended: {past_attended_matches.length}</p>
            <p>Signed up match attendence - how reliable of a team-mate are you: {(past_attended_matches.length/past_signed_up_matches.length)*100}%</p>
            <p>Future matches Signed up for  {future_signed_up_matches.length}</p>
            {/* then a list of all matches */}
            {/* these matches can be clicked and checked for details - it would take us to same deatiled page as from home and matches container */}
            <p>Current matches signed up for {current_signed_up_matches.length}</p>
            <p>Total Goals: {total_goals}</p>
            <p>Total Matches Created</p>
            <p>Date Joined</p>
            {/* for future features and functionalities */}
            <h4>For future expanded features and functionality:</h4>
            <p>Home Team</p>
            <p>Tendency to be on the winning team: </p>
            <p>Teams played for</p>
            <p>Tournatems played</p>
            <p>... and more</p>
        </div>
    )
}

export default UserProfile;