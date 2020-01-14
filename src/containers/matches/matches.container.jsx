import React from "react";

import MatchPreviewCurrent from "../../components/match-preview-current/match-preview-current.component";
import MatchPreviewUpcoming from "../../components/match-preview-upcoming/match-preview-upcoming.component";
import MatchPreviewFinished from "../../components/match-preview-finished/match-preview-finished.component";

import "./matches.styles.css";

const Matches = ({preview_matches, user_id, user_name, user_signed_up_matches, setStateMatches, onSetStatePlayerMatches, onEndPointFetch}) => {
    // this function should be a component, to be used in home component too
    const renderMatchPreview = () => {
        return <>
            <div className="current-matches-preview">
                <ul>
                    <h2>Current Matches preview</h2>
                    {preview_matches.filter(match => {
                        return new Date(match.match_date_start) < Date.now() && new Date(match.match_date_end) > Date.now();
                    })
                    .map(current_match => <li key={current_match.match_id}><MatchPreviewCurrent
                        match_id={current_match.match_id}
                        match_name={current_match.match_name}
                        match_date_start={current_match.match_date_start}
                        match_date_end={current_match.match_date_end}
                        match_venue={current_match.match_venue}
                        match_players_signed_up={current_match.match_players_signed_up}
                    />
                    </li>)
                    }
                </ul>
            </div>

            <div className="upcoming-matches-preview">
                <ul>
                    <h2>Upcoming Matches preview</h2>
                    {preview_matches.filter(match => {
                        return new Date(match.match_date_start) > Date.now();
                    })
                    .map(upcoming_match => <li key={upcoming_match.match_id}><MatchPreviewUpcoming
                        // this needs to be a function or a component, as it repeats in matches component too
                        match_id={upcoming_match.match_id}
                        match_name={upcoming_match.match_name}
                        match_date_start={upcoming_match.match_date_start}
                        match_date_end={upcoming_match.match_date_end}
                        match_venue={upcoming_match.match_venue}
                        match_players_signed_up={upcoming_match.match_players_signed_up}
                        user_id={user_id} 
                        user_name={user_name}
                        user_signed_up_matches={user_signed_up_matches} 
                        setStateMatches={setStateMatches}
                        onSetStatePlayerMatches={onSetStatePlayerMatches}
                        onEndPointFetch={onEndPointFetch}
                    />
                    </li>)
                    }
                </ul>
            </div>

            <div className="finished-matches-preview">
                <ul>
                    <h2>Finished Matches preview</h2>
                    {preview_matches.filter(match => {
                        return new Date(match.match_date_end) < Date.now();
                    })
                    .map(finished_match => <li key={finished_match.match_id}><MatchPreviewFinished
                        match_id={finished_match.match_id}
                        match_name={finished_match.match_name}
                        match_date_end={finished_match.match_date_end}
                        match_venue={finished_match.match_venue}
                        match_home_score={finished_match.match_home_score}
                        match_away_score={finished_match.match_away_score}
                        match_players_attended={finished_match.match_players_attended}
                    />
                    </li>)
                    }
                </ul>
            </div>
        </>
    }

    return (
        <div className="matches-matches">
            {renderMatchPreview()}
        </div>
    )
}

export default Matches;

