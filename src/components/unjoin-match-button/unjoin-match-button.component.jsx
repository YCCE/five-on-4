import React from "react";

import "./unjoin-match-button.styles.css";

const UnjoinMatchButton = (props) => {
    const {onEndPointFetch, match_id, setStateMatches, setStateMessageDetailed, user_id, onSetStatePlayerMatches, setStateMatchDetailed, detailed_match} = props;

    const onUnjoinMatch = () => {
        console.log("Unjoined the match! Not yet though...")
        // we need to access endpoint for unjoining the match
        // so, access the endpoint and get response back
        onEndPointFetch("delete", `/unjoinmatch/${match_id}`, {user_id: user_id})
        // set the state of all matches with the response from the endpoint
        .then(response => {
            if(response.message === "the match unjoined successfully"){
                setStateMatches(response.data);
            }
            else{
                setStateMessageDetailed(response.message);
            }
        })
        .catch(console.log);
        // fetch endpoint to get updated user's joined matches and set that into global logged user's state
        onEndPointFetch("get", `/joinedmatches/${user_id}`)
        .then(response => {
            if(response.message === "user matches fetched successfully"){
                onSetStatePlayerMatches(response.data);
            }
            else{
                return detailed_match? setStateMessageDetailed(response.message): null;
            }
        })
        .catch(console.log);

        // if coming from match detailed, update the detailed match state
        if(detailed_match){
            onEndPointFetch("get", `/match/${match_id}`)
            .then(response => {
                if(response.message === "match found"){
                    setStateMatchDetailed(response.data);
                }
                else{
                    return detailed_match? setStateMessageDetailed(response.message): null;
                }
            })
            .catch(console.log);
        }
    }
    return (
        <input 
        onClick={onUnjoinMatch}
        type="button" 
        value="Unjoin The Match Button Component" />
    )
}
export default UnjoinMatchButton;