import React from "react";

import "./join-match-button.styles.css";

const JoinMatchButton = (props) => {
    const {onEndPointFetch, match_id, setStateMatches, setStateMessageDetailed, user_id, user_name, onSetStatePlayerMatches, setStateMatchDetailed, detailed_match} = props;
    
    const onJoinMatch = () => {
        console.log("Joined the match! Not yet though...")
        // we need to access endpoint for joining the match
        // so, access the endpoint and get response back
        onEndPointFetch("put", `/joinmatch/${match_id}`, {user_name: user_name})
        // set the state of all matches with the response from the endpoint
        .then(response => {
            if(response.message === "the match joined successfully"){
                setStateMatches(response.data);
            }
            else{
                return detailed_match? setStateMessageDetailed(response.message): null;
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
                    setStateMessageDetailed(response.message)
                }
            })
            .catch(console.log);
        }
    }
    return (
        <input 
        onClick={onJoinMatch}
        type="button" 
        value="Join The Match Button Component" />
    )
}
export default JoinMatchButton;