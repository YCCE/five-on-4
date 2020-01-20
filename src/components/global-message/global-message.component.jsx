import React from "react";

import "./global-message.styles.css";

const GlobalMessage = ({message, setStateGlobalMessage}) => {
    return(
        <p>global message area: 
            <span>
            {message? (
                <strong>message</strong>,
                setTimeout(() => {
                    setStateGlobalMessage()
                },2000)
            ): null}
            </span>
        </p>
    )
}

export default GlobalMessage;