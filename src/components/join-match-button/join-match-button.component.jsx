import React from "react";

import "./join-match-button.styles.css";

const JoinMatchButton = (props) => {
    const {onEndPointFetch, match_id, setStateMatches, setStateMessageDetailed, user_id, onSetStatePlayerMatches, setStateMatchDetailed, detailed_match} = props;

    console.log(detailed_match);
    
    const onJoinMatch = () => {
        // fetch join match endpoint
        onEndPointFetch("put", "/joinmatch", {user_id: user_id, match_id: match_id})
        .then(join_response => {
            if(join_response.message === "match joined successfully"){
                // fetch preview matches endpoint and set matches state in app.js
                // front this point to the end of the function, this can be a separate function or another component to dry the code
                onEndPointFetch("get")
                .then(preview_matches_response => {
                    if(preview_matches_response.message === "preview matches retrieved successfully"){
                        setStateMatches(preview_matches_response.data)
                    }
                    else{
                        // some better error handling needed in case preview matches are not done
                        console.log(preview_matches_response.message);
                        return detailed_match? setStateMessageDetailed(preview_matches_response.message): null
                    }
                })
                .catch(console.log);

                // fetch joined matches endpoint and set joined matches state
                onEndPointFetch("get", `/signedupmatches/${user_id}`)
                .then(signed_up_matches => {
                    if(signed_up_matches.message === "user matches fetched successfully"){
                        console.log("signed up matches", signed_up_matches.data)
                        onSetStatePlayerMatches(signed_up_matches.data);
                    }
                    else{
                        // some better error handling needed in case preview matches are not done
                        console.log(signed_up_matches.message);
                        return detailed_match? setStateMessageDetailed(signed_up_matches.message): null
                    }
                })
                .catch(console.log);
            }
            else{
                // notifying user only in case of detailed component, but need to do it in overview as well somehow
                console.log(join_response.message);
                return detailed_match? setStateMessageDetailed(join_response.message): null
            }
        })
        .catch(console.log);
        // if detailed, set detailed match state
        if(detailed_match){
            console.log("detailed_match");
            onEndPointFetch("get", `/match/${match_id}`)
            .then(detailed_match_response => {
                if(detailed_match_response.message === "detailed match retrieved successfully"){
                    setStateMatchDetailed(detailed_match_response.data);
                }
                else{
                    console.log(detailed_match.response);
                    setStateMessageDetailed(detailed_match_response.message);
                }
            })
            .catch(console.log)
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