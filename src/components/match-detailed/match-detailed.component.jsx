import React from "react";
import { useParams, useHistory, Link } from "react-router-dom";

import "./match-detailed.styles.css";

const MatchDetailed = ({matches}) => {
    const { id } = useParams();
    const { goBack } = useHistory();
    const match = matches.find(match => match.match_id === Number(id))

    if(!matches.length) return null;
    
    return (
        <div>
            <p onClick={goBack}> Go Back</p>
            <h3>Match Detailed Component</h3>
            <h4>{match.match_name}</h4>
            <Link to={`/updatematch/${match.match_id}`}>
                <input type="button" value="Edit"/>
            </Link>
        </div>
    )

}

export default MatchDetailed;