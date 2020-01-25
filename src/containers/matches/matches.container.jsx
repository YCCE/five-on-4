import React from "react";

import "./matches.styles.css";

import MapPreviewMatches from "../../components/map-preview-matches/map-preview-matches.component";

const Matches = ({preview_matches, user_id, user_name, user_signed_up_matches, setStateMatches, setStatePlayerMatches, fetchEndPoint}) => {
    return (
        <div className="home">
            <MapPreviewMatches
                preview_matches={preview_matches} 
                user_id={user_id}
                user_name={user_name}
                user_signed_up_matches={user_signed_up_matches}
                setStateMatches={setStateMatches}
                setStatePlayerMatches={setStatePlayerMatches}
                fetchEndPoint={fetchEndPoint}
            />
        </div>
    )
}

export default Matches;