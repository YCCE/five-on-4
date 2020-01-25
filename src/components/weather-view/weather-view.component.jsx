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
        const {
            summary, 
            icon, 
            precipProbability, 
            precipType, 
            temperature, 
            apparentTemperature, 
            windSpeed
        } = this.state
        const {adjustMargin, matchDate} = this.props

        return (
            <div className={`weather-view ${adjustMargin}`}>
                <h1 className="weather-view-title">
                    {new Date(matchDate*1000).toDateString() === new Date(Date.now()).toDateString()?(`Weather for ${new Intl.DateTimeFormat("en-GB", {weekday: "long"}).format(new Date(matchDate*1000))}, ${new Date(matchDate*1000).toDateString().slice(4)}`):(`Match Day Weather Forecast`)}
                </h1>

                <div className="weather-info">
                    <div className="weather-details">
                        <p className="weather-summary-temp">
                            <span>{summary} </span>
                            <span>{temperature}°C</span>
                        </p>
                        <p className="weather-feels-like">Feels like {apparentTemperature}°C</p>
                        <p className="weather-wind">Wind speed: {windSpeed}km/h</p>
                        {(precipProbability && precipType)? <p className="weather-precip">{precipProbability*100}% chance to <strong>{precipType}</strong></p>: null}
                    </div>
                    <div className={`weather-icon ${icon}`}/>
                </div>
            </div>
        )
    }
}

export default WeatherView;