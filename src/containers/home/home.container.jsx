import React from "react";

import MatchPreview from "../../components/match-preview/match-preview.component";

import "./home.styles.css";

const Home = ({matches}) => (
    <div>
        <h1>Home Container</h1>
        <ul>
            <h2>Current Matches preview</h2>
            {matches.filter(match => {
                return (
                    new Date(match.date_start) < Date.now() && new Date(match.date_end) > Date.now()
                )
            })
            .filter((match, index) => index < 3)
            .map(current_match => <li key={current_match.match_id}><MatchPreview match={current_match}/></li>)
            }
        </ul>
        <ul>
            <h2>Upcoming Matches preview</h2>
            {matches.filter(match => {
                return (
                    new Date(match.date_start) > Date.now()
                )
            })
            .filter((match, index) => index < 3)
            .map(upcoming_match => <li key={upcoming_match.match_id}><MatchPreview match={upcoming_match}/></li>)
            }
        </ul>
        <ul>
            <h2>Finished Matches preview</h2>
            {matches.filter(match => {
                return (
                    new Date(match.date_end) < Date.now()
                )
            })
            .filter((match, index) => index < 3)
            .map(finished_match => <li key={finished_match.match_id}><MatchPreview match={finished_match}/></li>)
            }
        </ul>
    </div>
)

export default Home;

