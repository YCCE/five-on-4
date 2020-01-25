import React from "react";
import { withRouter } from "react-router-dom";

import "./map-preview-matches.styles.css";

import MatchPreviewCurrent from "../match-preview-current/match-preview-current.component";
import MatchPreviewUpcoming from "../match-preview-upcoming/match-preview-upcoming.component";
import MatchPreviewFinished from "../match-preview-finished/match-preview-finished.component";

const MapPreviewMatches = ({preview_matches, user_id, user_name, user_signed_up_matches, setStateMatches, setStatePlayerMatches, fetchEndPoint, setStateGlobalMessage, location}) => {
// TODO // there is a lot of prop drilling here. need context eventually
    const isMatches = location.pathname === "/matches"? true: false;
    return (
        <>
{/* TODO // this kind of looping and mapping might be an issue when and if lots matches */}
            <div className="upcoming-matches-preview">
                <h2 className="upcoming-matches-heading">Upcoming Matches</h2>
                <div className="upcoming-matches-area">
                    <ul className="preview-matches-list">
                        {preview_matches.filter(match => {
                            return new Date(match.match_date_start) > Date.now();
                        })
                        .filter((m, index) => {
                            return isMatches || index < 3;
                        })
                        .map(upcoming_match => <li key={upcoming_match.match_id}>
                            <MatchPreviewUpcoming
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
                                setStatePlayerMatches={setStatePlayerMatches}
                                fetchEndPoint={fetchEndPoint}
                                setStateGlobalMessage={setStateGlobalMessage}
                            />
                        </li>)}
                    </ul>
                </div>
            </div>

            <div className="current-matches-preview">
                <h2 className="current-matches-heading">Current Matches</h2>
                <div className="current-matches-area">
                    <ul className="preview-matches-list">
                        {preview_matches.filter(match => {
                            return new Date(match.match_date_start) < Date.now() && new Date(match.match_date_end) > Date.now();
                        })
                        .filter((m, index) => {
                            return isMatches || index < 3;
                        })
                        .map(current_match => <li key={current_match.match_id}>
                            <MatchPreviewCurrent
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
            </div>

            <div className="finished-matches-preview">
                <h2 className="finished-matches-heading">Finished Matches</h2>
                <div className="finished-matches-area">
                    <ul className="preview-matches-list">
                        {preview_matches.filter(match => {
                            return new Date(match.match_date_end) < Date.now();
                        })
                        .filter((m, index) => {
                            return isMatches || index < 3;
                        })
                        .map(finished_match => <li key={finished_match.match_id}>
                            <MatchPreviewFinished
                                match_id={finished_match.match_id}
                                match_name={finished_match.match_name}
                                match_date_end={finished_match.match_date_end}
                                match_home_score={finished_match.match_home_score}
                                match_away_score={finished_match.match_away_score}
                            />
                        </li>)}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default withRouter(MapPreviewMatches);