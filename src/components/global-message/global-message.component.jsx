import React from "react";

import "./global-message.styles.css";

const GlobalMessage = ({message, setStateGlobalMessage}) => {
    return(
        <div className="global-message-area">
            <p className="actual-global-message">
                {message && <span>{message}</span>}
            </p>
        </div>
    )
}

export default GlobalMessage;