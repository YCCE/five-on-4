import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./match-detailed.styles.css";

import JoinMatchButton from "../../components/join-match-button/join-match-button.component";
import UnjoinMatchButton from "../../components/unjoin-match-button/unjoin-match-button.component";

class MatchDetailed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            detailed_match: {
                match_id: "",
                match_name: "",
                match_date_start: "",
                match_date_end: "",
                match_venue: "",
                match_players_signed_up: [],
                match_players_attended: [],
                match_home_score: "0",
                match_away_score: "0",
                match_home_scorers: [],
                match_away_scorers: [],
                match_home_team: [],
                match_away_team: [],
                match_reported: false,
            },
            detailed_match_weather: {
                summary: "",
                icon: "",
                precipProbability: "",
                precipType: "",
                temperature: "",
                apparentTemperature: "",
                windSpeed: ""
            },
            message: null,
        };
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const {onEndPointFetch} = this.props;
        // fetching match and weather
        onEndPointFetch("get", `/match/${id}`)
        .then(detailed_match_response => {
            if(detailed_match_response.message === "detailed match retrieved successfully"){

                // fetching wather data, that will eventually be passed as a prop to a weather component
                onEndPointFetch("get", `/getweather/${String(Math.round(new Date(detailed_match_response.data.match_date_start).getTime()/1000))}`)
                .then(weather_response => {
                    if(weather_response.message === "weather fetched successfully"){
                        this.setState({detailed_match_weather: weather_response.data, detailed_match: detailed_match_response.data});
                    }
                    else{
                        this.setState({message: "There was an issue fetching weather", detailed_match: detailed_match_response.data});
                    }
                })
                .catch(console.log);
                // end of weather fetch
            } 
            else{
                this.setState({message: "There were issues with fetching the match. Please try again."})
            }
        })
        .catch(console.log);
    }
    // function for setting message state for info to user
    setStateMessageDetailed = (message) => {
        this.setState({message: message});
    }
    // function for setting match state for other components
    setStateMatchDetailed = (match) => {
        this.setState({match: match});
    }
    // function to render appropriate button to join, unjoin match or login to do so
    // this should probably be a function because it repeats in match detailed too
     renderMatchAction = () => {
        const {joined_matches, onEndPointFetch, setStateMatches, user_id, onSetStatePlayerMatches} = this.props;
        if(joined_matches.includes(this.state.detailed_match.match_id)){
            return <UnjoinMatchButton
                        onEndPointFetch={onEndPointFetch}
                        match_id={this.state.detailed_match.match_id}
                        setStateMatches={setStateMatches}
                        user_id={user_id}
                        onSetStatePlayerMatches={onSetStatePlayerMatches}
                        setStateMessageDetailed={this.setStateMessageDetailed}
                        setStateMatchDetailed={this.setStateMatchDetailed}
                        detailed_match
                    />
        }
        else{
            return <JoinMatchButton
                        onEndPointFetch={onEndPointFetch}
                        match_id={this.state.detailed_match.match_id}
                        setStateMatches={setStateMatches}
                        user_id={user_id}
                        onSetStatePlayerMatches={onSetStatePlayerMatches}
                        setStateMessageDetailed={this.setStateMessageDetailed}
                        setStateMatchDetailed={this.setStateMatchDetailed}
                        detailed_match
                    />
        }
    }

    render(){
        const {goBack} = this.props.history;
        const {match_id, match_name, match_date_start, match_date_end,match_venue, match_players_signed_up, match_players_attended, match_home_score, match_away_score, match_home_scorers,match_away_scorers, match_home_team, match_away_team, match_reported } = this.state.detailed_match;

        return (
            <div>
                <button onClick={goBack}>Go Back</button>

                {/* this will be a separate component for match detailed description */}
                <div className="detailed-match-basic-info">
                    <h2>{this.state.detailed_match.match_name}</h2>
                    <p>start: {new Date(this.state.detailed_match.match_date_start).toLocaleTimeString().slice(0,5)}, {new Date (this.state.detailed_match.match_date_start).toDateString()}</p> 
                    <p>end: {new Date(this.state.detailed_match.match_date_end).toLocaleTimeString().slice(0,5)}, {new Date (this.state.detailed_match.match_date_end).toDateString()}</p> 
                    <p>venue: {this.state.detailed_match.match_venue}</p> 
                    <p>players signed up:</p> 
                    <ol>{match_players_signed_up.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>

                </div>
            {match_reported? (
                <div className="detailed-match-report-info">
                    <h3>Match Report</h3>
                    <p>players attended:</p>  
                    <ol>{match_players_attended.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>
                    <p>match score: home {match_home_score} - {match_away_score} away</p>
                    <p>home team:</p>
                    <ol>{match_home_team.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>
                    <p>home scorers:</p>
                    <ol>{match_home_scorers.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>
                    <p>away team:</p>
                    <ol>{match_away_team.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>
                    <p>away scorers:</p>
                    <ol>{match_away_scorers.map(player => {
                        return <li key={player}>{player}</li>
                    })}</ol>
                </div>):
                (<button>Create Match Report</button>)
            }


                {/* this will be a separate component for weather, used on the home page as well */}
                <div className="detailed-match-weather">
                    <h3>Weather Forecast</h3>
                    <p>summary: {this.state.detailed_match_weather.summary}</p>
                    <p>temperature: {this.state.detailed_match_weather.temperature}°C</p>
                </div>
                {/* weather ends here */}

                <Link to={`/updatematch/${this.state.detailed_match.match_id}`}>
                    <input type="button" value="Edit"/>
                </Link>

                {/* render join buttons only for upcoming matches */}
                {this.props.user_id? this.renderMatchAction(): <Link to="/login"><button>Login to join</button></Link>}

                {/* to be removed */}
                <p>// to be removed // match id: {this.state.detailed_match.match_id}</p>

                {/* palceholder for message in case of error */}
                {this.state.message? <p>{this.state.message}</p>: null}
            </div>
        )
    }    
}

export default withRouter(MatchDetailed);