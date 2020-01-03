import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";
import { matches_dynamic } from "../../assets/database";

const MatchPreview = ({match, logged_user, setStateProperty}) => {
    const match_dynamic = matches_dynamic.find(match_dynamic => match_dynamic.match_id === match.match_id);

    const join_match = () => {
        console.log("Joined the match!")
        // find the match with this id, dynamic match though
        // push the logged user id into signup users array
        // before that, render cancel or signed up, depending on whether the user already in the match
    }
    // this is for test only too. database will handle this anyway, and i will just be 
    const cancel_arrival = () => {
        console.log("Cancelled match participation");

        matches_dynamic.forEach(match_dynamic => {
            if(match_dynamic.match_id === match.match_id){
                const index = match_dynamic.users_signed_up.indexOf(logged_user.id)
                match_dynamic.users_signed_up.splice(index, 1);
            }
        })

        const joined_matches = matches_dynamic.filter(match => match.users_signed_up.some(user => user === logged_user.d))
        .map(match => match.match_id)

        setStateProperty("logged_user", {id: logged_user.id, name: logged_user.name, email: logged_user.email, joined_matches: joined_matches})


        console.log(matches_dynamic.find(match_dynamic => match_dynamic.match_id === match.match_id));

        // need somehow to update the state too with this new match
        // with setstateproperty?
    }
    
    // this will eventually be a separate component, a button
    const ifLoggedUserProp = () => {
        if(logged_user.id){
            if(logged_user.joined_matches.some(joined_match => joined_match === match.match_id)){
                return <input type="button" value="Cancel arrival" onClick={cancel_arrival}/>
            } else {
                return <input type="button" value="Join the match" onClick={join_match}/>
            }
        } else {
            return <span>Log in to join the match</span>
        }
    }

    return (
        <div>
            <h3>Match Preview Component</h3>
            <h4>{match.match_name}</h4>
            <h4>Players arriving: {match_dynamic.users_signed_up.length}</h4>
            <h4>Match ID: {match.match_id}</h4>
            <h5>{new Date(match.date_start).toLocaleString()}</h5>
            <Link to={`/match/${match.match_id}`}>
                <input type="button" value="Details"/>
            </Link>
            {logged_user? <p>{ifLoggedUserProp()}</p>: null}


        </div>
    )
}

export default MatchPreview;