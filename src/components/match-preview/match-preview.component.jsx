import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";

import JoinMatchButton from "../join-match-button/join-match-button.component";
import UnjoinMatchButton from "../unjoin-match-button/unjoin-match-button.component";


const MatchPreview = (props) => {
    const {onEndPointFetch, setStateMatches, logged_user, onSetStatePlayerMatches, match} = props;

    // this, and the same code in match detailed, definitely has to be a new component
    const renderMatchAction = () => {
        const {name, joined_matches} = logged_user;
        const id = match.match_id;
        console.log("name:", name)
        console.log("joined matches:", joined_matches)
        console.log("id:", id);
        console.log("match:", match);
        // if logged user and not joined match yet, show join button
        if(name && !joined_matches.some(joined_match => Number(joined_match.match_id) === Number(id))){
            console.log("join the match");
            return <JoinMatchButton
                    onEndPointFetch={onEndPointFetch}
                    match_id={id}
                    setStateMatches={setStateMatches}
                    // have to figure out where to set this message and how to render it in case needed
                    // setStateMessageDetailed={this.setStateMessageDetailed}
                    user_id={logged_user.id}
                    onSetStatePlayerMatches={onSetStatePlayerMatches}
                    // the two below are not needed either because i am not setting state, and these buttons are not used in detailed match component
                    // setStateMatchDetailed={this.setStateMatchDetailed}
                    // detailed_match
                    />
        }
        // if logged user and joined match, show unjoin button
        else if(name && joined_matches.some(joined_match => Number(joined_match.match_id) === Number(id))){
            console.log("unjoin the match");
            return <UnjoinMatchButton
                    onEndPointFetch={onEndPointFetch}
                    match_id={id}
                    setStateMatches={setStateMatches}
                    // have to figure out where to set this message and how to render it in case needed
                    // setStateMessageDetailed={this.setStateMessageDetailed}
                    user_id={logged_user.id}
                    onSetStatePlayerMatches={onSetStatePlayerMatches}
                    // the two below are not needed either because i am not setting state, and these buttons are not used in detailed match component
                    // setStateMatchDetailed={this.setStateMatchDetailed}
                    // detailed_match
                    />
        }
        // else, show login to join match button
        else{
            console.log("login to join the match")
            return <Link to="/login">Login to join the match</Link>
        }
    }

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

            {/* render join buttons only for upcoming matches */}
            {/* this needs to be another component later, because the same code repeats in match detailed component */}
            {new Date(match.date_start) > Date.now()? renderMatchAction(): null}

        </div>
    )
}
export default MatchPreview;