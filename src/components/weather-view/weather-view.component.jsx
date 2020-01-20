import React from "react";

import "./weather-view.styles.css";

class WeatherView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            summary: "",
            icon: "",
            precipProbability: "",
            precipType: "",
            temperature: "",
            apparentTemperature: "",
            windSpeed: ""
        }
    }

    componentDidMount(){
        const {matchDate, fetchEndPoint} = this.props
        fetchEndPoint("get", `/getweather/${matchDate}`)
        .then(weatherResponse => {
            console.log(weatherResponse)
            weatherResponse.message === "weather fetched successfully" && this.setState(weatherResponse.data)
        })
        .catch(wethrErr => {
            console.log(wethrErr);
            this.setState({summary: "unable to retrieve weather data"});
        })
    }

    render(){
        console.log(this.state);
        const {
            summary, 
            icon, 
            precipProbability, 
            precipType, 
            temperature, 
            apparentTemperature, 
            windSpeed
        } = this.state
        return(
            <div className="detailed-match-weather">
                <h3>Match Day Weather Forecast</h3>
                <p>summary: <strong>{summary}</strong></p>
                <div className={icon}/>
                <p>temperature: <strong>{temperature}°C</strong></p>
                <p>apparent temperature: <strong>{apparentTemperature}°C</strong></p>
                <p>wind speed: <strong>{windSpeed} km/h</strong></p>
                {(precipProbability && precipType)?
                <p><strong>{precipProbability}%</strong> chance to <strong>{precipType}</strong></p>: null}
            </div>
        )
    }
}

export default WeatherView;