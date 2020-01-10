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
            },
            detailed_match_weather: {
                temperature: "",
                summary: "",
                windSpeed: "",
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
        const {match_id, match_name, match_date_start, match_date_end,match_venue, match_players_signed_up, match_players_attended, match_home_score, match_away_score, match_home_scorers,match_away_scorers, match_home_team, match_away_team } = this.state.detailed_match;

        return (
            <div>
                <button onClick={goBack}>Go Back</button>
                
                {/* this will be a separate component for match detailed description */}
                <div className="detailed-match-content">
                    <h2>{this.state.match_name}</h2>
                </div>
                {/* this will be a separate component for weather, used on the home page as well */}
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