import React from "react";

import "./join-match-button.styles.css";

const JoinMatchButton = ({joinOrUnjoin}) => {

    return (
        <input 
        onClick={() => joinOrUnjoin("/joinmatch")}
        type="button" 
        value="Join The Match Button Component" />
    )
}
export default JoinMatchButton;