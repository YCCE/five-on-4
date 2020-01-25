import React from "react";

import "./join-match-button.styles.css";

const JoinMatchButton = ({joinOrUnjoin}) => {

    return (
        <a className="button-join" href="" type="button" onClick={(e) => joinOrUnjoin(e,"/joinmatch")}>Join The Match</a>
    )
}
export default JoinMatchButton;