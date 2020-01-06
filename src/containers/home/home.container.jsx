import React from "react";

import MatchPreview from "../../components/match-preview/match-preview.component";

import "./home.styles.css";

// this is just for testing functionality of the weather dark sky api. it will be its own componennt
const getWeather = (onEndPointFetch) => {
/*     onEndPointFetch("get", "/getweather")
    .then(console.log); */
    fetch("https://api.darksky.net/forecast/7e5a6c3357123c8400c93c56caa83743/44.868447,13.850852,1578336167")
    .then(response => response.json());


}

const Home = ({matches, logged_user, setStateMatches, onSetStatePlayerMatches, onEndPointFetch}) => {
    return (
        <div>
            {/* this is just a test. there will be another component doing this part */}
            <div className="weather-section">
                <h1>Home</h1>
                <div>
                    <h2>Weather Today</h2>
                    {getWeather(onEndPointFetch)}
                </div>

            
            </div>
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
                    joined_matches={logged_user.joined_matches.map(match => match.match_id)}
                    setStateMatches={setStateMatches} 
                    onEndPointFetch={onEndPointFetch} 
                    onSetStatePlayerMatches={onSetStatePlayerMatches}
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

