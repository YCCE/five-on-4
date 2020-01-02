import React from "react";
import { Link } from "react-router-dom";

import "./match-preview.styles.css";

const MatchPreview = ({match}) => (
    <div>
        <h3>Match Preview Component</h3>
        <h4>{match.match_name}</h4>
        <h5>{new Date(match.date_start).toLocaleString()}</h5>
        <Link to={`/match/${match.match_id}`}>
            <input type="button" value="Details"/>
        </Link>
    </div>
)

export default MatchPreview;