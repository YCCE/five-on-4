import React from "react";

import MatchPreview from "../../components/match-preview/match-preview.component";

import "./home.styles.css";

const Home = ({matches, logged_user, setStateMatches, onSetStatePlayerMatches, onEndPointFetch, weather}) => {
    return (
        <div>
            <h1>Home Container</h1>
            <p>Demo credentials: email: world@gmail.com, pass: world</p>

            {/* this is just a test. there will be another component doing this part */}
            
            {weather?(
                <div className="weather-section">
                    <div>
                        <h4>Weather Today</h4>
                        <h5>Summary: {weather.summary}</h5>
                        <h5>Temperature: {weather.temperature}</h5>
                        <h5>Wind Speed: {weather.windSpeed}</h5>
                    </div>
                </div>
                ): null
            }



            <div className="home-matches">
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
                    .map(upcoming_match => <li key={upcoming_match.match_id}>
                    <MatchPreview 
                    match={upcoming_match} 
                    logged_user={logged_user}
                    setStateMatches={setStateMatches}
                    onSetStatePlayerMatches={onSetStatePlayerMatches}
                    onEndPointFetch={onEndPointFetch}
                    /></li>)
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
        </div>
    )
}

export default Home;

