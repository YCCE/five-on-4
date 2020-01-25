import React from "react";

import "./unjoin-match-button.styles.css";

const UnjoinMatchButton = ({joinOrUnjoin}) => {

    return (
        <a className = "button-unjoin" type="button" href="" onClick={(e) => joinOrUnjoin(e, "/unjoinmatch")}>Unjoin The Match</a>
    )
}
export default UnjoinMatchButton;