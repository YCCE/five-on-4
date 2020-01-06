import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";

// function to render join or cancel match button if a user is logged in - likely to be a separate component in future
const renderSignupButton = (joined_matches, onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches) => {
    if(joined_matches.some(joined_match => joined_match === match.match_id)){
        return <input onClick={() => cancelArrival(onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches)} type="button" value="Cancel attendance" />
    }
    else{
        // this callback function for join the match does not look right, need to see if this can be fixed in separate component
        return <input onClick={() => joinTheMatch(onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches)} type="button" value="Join the match" />
    }
}
// functionality to have user join the match - will be separate component
// it actually just adds the user's id to the user's signedup array for the particular match
// and then refetches array with user's matches to populate app.js state
const joinTheMatch = (onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches) => {
    console.log("Joined the match!");
    // calling the fetch matches endpoint to have the player join the match
    console.log(match.match_id);
    console.log("loggeduser id", logged_user.id);

    onEndPointFetch("put", `/joinmatch/${match.match_id}`, {user_id: logged_user.id})
    // need to set matches state in the app.js
    .then(response => {
        console.log("response from put.joinmatch", response);
        if(response.message === "the match joined successfully"){
            // if we joined the match successfully
            // we set matches state in app.js
            setStateMatches(response.data);
            console.log("response.data", response.data)
            console.log("logged user id", logged_user);
            // and we fetch all joined matches
            onEndPointFetch("get", `/joinedmatches/${logged_user.id}`)
            // then we set the state of joined matches if all good
            // note that this same code appears in login component. could it be extracted as a component?
            .then(user_matches_response => {
                console.log("length of joined matches", user_matches_response)
                if(user_matches_response.message === "user matches fetched successfully"){
                    onSetStatePlayerMatches(user_matches_response.data);
                }
                else{
                    // nothing to really do here if joined matches are not returned
                    // could return user to login, or give some 404
                    // or have some global error message to be rendered on the page, or just redirected to
                    console.log(user_matches_response.message);
                }
            })
            .catch(console.log);
        }
        else{
            console.log(response.message);
        }
    })
    .catch(console.log);
}
// function to remove the player from the match
// same idea applies as with the join the match functionality
// and code is pretty much the same
const cancelArrival = (onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches) => {
    console.log("Arrival cancelled!");

    // calling the fetch matches endpoint to have the player unjoin the match
    onEndPointFetch("delete", `/unjoinmatch/${match.match_id}`, {user_id: logged_user.id})
    // need to set matches state in the app.js
    .then(response => {
        if(response.message === "the match unjoined successfully"){
            // if we unjoined the match successfully
            // we set matches state in app.js
            setStateMatches(response.data);
            // and we fetch all joined matches
            onEndPointFetch("get", `/joinedmatches/${logged_user.id}`)
            // then we set the state of joined matches if all good
            // note that this same code appears in login component. could it be extracted as a component?
            .then(user_matches_response => {
                if(user_matches_response.message === "user matches fetched successfully"){
                    onSetStatePlayerMatches(user_matches_response.data);
                }
                else{
                    // nothing to really do here if joined matches are not returned
                    // could return user to login, or give some 404
                    // or have some global error message to be rendered on the page, or just redirected to
                    console.log(user_matches_response.message);
                }
            })
            .catch(console.log);
        }
        else{
            console.log(response.message);
        }
    })
    .catch(console.log);
}

const MatchPreview = ({match, joined_matches, logged_user, setStateMatches, onSetStatePlayerMatches, onEndPointFetch}) => {

    return (
        <div>
            <h3>Match Preview Component</h3>
            <p>match name: {match.match_name}</p>
            <p>match id: {match.match_id}</p>

            <p>players signed up: {match.users_signed_up.length}</p>
            <p>date start: {new Date(match.date_start).toLocaleString()}</p>
            <Link to={`/match/${match.match_id}`}>
                <input type="button" value="Details"/>
            </Link>
            {joined_matches && logged_user.name? renderSignupButton(joined_matches, onEndPointFetch, match, logged_user, setStateMatches, onSetStatePlayerMatches): <Link to="/login"><input type="button" value="Login to join the match" /></Link>}


            {/* ok, trying to implement button component instead of having logic here in this component */}


        </div>
    )
}
export default MatchPreview;