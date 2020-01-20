import React from "react";

import "./home.styles.css";

import MapPreviewMatches from "../../components/map-preview-matches/map-preview-matches.component";
import WeatherView from "../../components/weather-view/weather-view.component";

const Home = ({preview_matches, user_id, user_name, user_signed_up_matches, setStateMatches, setStatePlayerMatches, setStateGlobalMessage, fetchEndPoint, weather}) => {

    return (
        <div className="home">
            <WeatherView
                    matchDate={Math.round(Date.now()/1000)}
                    fetchEndPoint={fetchEndPoint}/>
            <MapPreviewMatches
                preview_matches={preview_matches} 
                user_id={user_id}
                user_name={user_name}
                user_signed_up_matches={user_signed_up_matches}
                setStateMatches={setStateMatches}
                setStatePlayerMatches={setStatePlayerMatches}
                fetchEndPoint={fetchEndPoint}
                setStateGlobalMessage={setStateGlobalMessage}/>
        </div>
    )
}

export default Home;

