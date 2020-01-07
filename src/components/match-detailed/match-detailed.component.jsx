import React from "react";
import { Link, withRouter } from "react-router-dom";

import "./match-detailed.styles.css";

import JoinMatchButton from "../join-match-button/join-match-button.component";
import UnjoinMatchButton from "../unjoin-match-button/unjoin-match-button.component";

class MatchDetailed extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            match: {
                match_id: "",
                match_name: "",
                date_start: "",
                date_end: "",
                venue: "",
                users_signed_up: [],
                users_attended: [],
                home_score: "0",
                away_score: "0",
                home_scorers: [],
                away_scorers: [],
                home_team: [],
                away_team: [],
            },
            match_weather: {
                temperature: "",
                summary: "",
                windSpeed: "",
            },
            message: null,
        };
    }
    // fetching match and fetching weather with timeout after match stsate was set
    componentDidMount(){
        // fetch with help of id
        const {id} = this.props.match.params;
        this.props.onEndPointFetch("get", `/match/${id}`)
        .then(response => {
            if(response.message === "match found"){
                // fetching wather data, that will eventually be passed as a prop to a weather component
                this.props.onEndPointFetch("get", `/getweather/${String(Math.round(new Date(response.data.date_start).getTime()/1000))}`)
                .then(weather_response => {
                  this.setState({match_weather: weather_response, match: response.data});
                })
                .catch(console.log);
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
    renderMatchAction = () => {
        const {name, joined_matches} = this.props.logged_user;
        const { id } = this.props.match.params;
        // if logged user and not joined match yet, show join button
        if(name && !joined_matches.some(joined_match => Number(joined_match.match_id) === Number(id))){
            console.log("join the match");
            return <JoinMatchButton
                    onEndPointFetch={this.props.onEndPointFetch}
                    match_id={id}
                    setStateMatches={this.props.setStateMatches}
                    setStateMessageDetailed={this.setStateMessageDetailed}
                    user_id={this.props.logged_user.id}
                    onSetStatePlayerMatches={this.props.onSetStatePlayerMatches}
                    setStateMatchDetailed={this.setStateMatchDetailed}
                    detailed_match
                    />
        }
        // if logged user and joined match, show unjoin button
        else if(name && joined_matches.some(joined_match => Number(joined_match.match_id) === Number(id))){
            console.log("unjoin the match");
            return <UnjoinMatchButton
                    onEndPointFetch={this.props.onEndPointFetch}
                    match_id={id}
                    setStateMatches={this.props.setStateMatches}
                    setStateMessageDetailed={this.setStateMessageDetailed}
                    user_id={this.props.logged_user.id}
                    onSetStatePlayerMatches={this.props.onSetStatePlayerMatches}
                    setStateMatchDetailed={this.setStateMatchDetailed}
                    detailed_match
                    />
        }
        // else, show login to join match button
        else{
            console.log("login to join the match")
            return <Link to="/login">Login to join the match</Link>
        }
    }

    render(){
        console.log(this.state.match_weather);
        const {goBack} = this.props.history;
        return (
            <div>

                <p onClick={goBack}> Go Back</p>
                {/* this will be a separate function component to provide detailed info about the match */}
                <h3>Match Detailed Component</h3>
                <h4>{this.state.match.match_name}</h4>
                <h4>{this.state.match.match_id}</h4>
                <h4>{this.state.match.date_start}</h4>
                <p>Joined players: {this.state.match.users_signed_up.length}</p>
                <p>Players:{this.state.match.users_signed_up}</p>
                <h4>Weather on the Day</h4>
                <h5>Summary: {this.state.match_weather.summary}</h5>
                <h5>Temperature: {this.state.match_weather.temperature}</h5>
                <h5>Wind Speed: {this.state.match_weather.windSpeed}</h5>
                <Link to={`/updatematch/${this.state.match.match_id}`}>
                    <input type="button" value="Edit"/>
                </Link>

                {/* render join buttons only for upcoming matches */}
                {new Date(this.state.match.date_start) > Date.now()? this.renderMatchAction(): null}

                {/* palceholder for message in case of error */}
                {this.state.message? <p>{this.state.message}</p>: null}
            </div>
        )
    }    
}

export default withRouter(MatchDetailed);