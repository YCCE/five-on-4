import React from "react";

import "./join-unjoin-match.styles.css";

import JoinMatchButton from "../join-match-button/join-match-button.component"
import UnjoinMatchButton from "../unjoin-match-button/unjoin-match-button.component"

const JoinUnjoinMatch = (props) => {

    const {
        user_id, 
        match_id, 
        user_signed_up_matches,
        fetchEndPoint, 
        setStateMatches, 
        setStatePlayerMatches, 
        setStateGlobalMessage,
        setStateMatchDetailed, 
        detailed_match
    } = props;
    
    const joinOrUnjoin = (event, endpointParam) => {
        event.preventDefault();
        // join and unjoin button will send /joinmatch or /unjoinmatch arguments to access their endpoints
        fetchEndPoint("put", endpointParam, {user_id, match_id})
        .then(joinResponse => setStateGlobalMessage(joinResponse.message))
        .catch(joinError => setStateGlobalMessage(`there was an issue ${endpointParam.slice(1, endpointParam.indexOf("m") )}ing the match`))
        // fetching preview matches
        .then(() => {
            fetchEndPoint("get")
            .then(previewMatchesResponse => previewMatchesResponse.message === "preview matches retrieved successfully" && setStateMatches(previewMatchesResponse.data))
        // TODO // there might be an issue here where server sends response via its catch, but we dont test it here, and not logging it anywhere
        // something for future - same for joined matches and detailed
        // TODO // some redirect in case of no good - or just a message will do?
            .catch(matchesError => setStateGlobalMessage("there was an issue retrieving preview matches"))
        })
        // do i really need this...
        .catch(console.log)
        .then(()=> {
            fetchEndPoint("get", `/signedupmatches/${user_id}`)
            .then(signedUpMatchesResponse => signedUpMatchesResponse.message === "user matches fetched successfully" && setStatePlayerMatches(signedUpMatchesResponse.data))
            .catch(signedUpError => setStateGlobalMessage("there was an issue retrieving signed up matches"))
        })
        .catch(console.log)
        .then(() => {
            if(detailed_match){
                return fetchEndPoint("get", `/detailedmatch/${match_id}`)
                .then(detailedMatchResponse => {
                    detailedMatchResponse.message === "detailed match retrieved successfully" && setStateMatchDetailed(detailedMatchResponse.data)
                    console.log(detailedMatchResponse.data);
                })
                .catch(detailedError => setStateGlobalMessage("there was an issue retrieving match details"))
            }
            return;
        })
        .catch(console.log);
    }

    return <>
            {user_signed_up_matches.some(match => match.match_id === match_id)?   
            (<UnjoinMatchButton
                joinOrUnjoin={joinOrUnjoin}
            />):
            (<JoinMatchButton
                joinOrUnjoin={joinOrUnjoin}
            />)}
        </>
}

export default JoinUnjoinMatch;