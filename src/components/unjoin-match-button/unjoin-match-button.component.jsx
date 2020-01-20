import React from "react";

import "./unjoin-match-button.styles.css";

const UnjoinMatchButton = ({joinOrUnjoin}) => {

    return (
        <input 
        onClick={() => joinOrUnjoin("/unjoinmatch")}
        type="button" 
        value="Unjoin The Match Button Component" />
    )
}
export default UnjoinMatchButton;