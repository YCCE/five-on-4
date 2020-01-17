import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import "./report-match.styles.css";

class ReportMatch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            match_players_signed_up: [],
            match_players_attended: [],
            match_scorers: [],
            match_home_team: [],
            match_away_team: [],
            match_reported: false,
            match_home_score: "",
            match_away_score: "",
            redirect: null,
        };

        /* 
            onEndPointFetch={this.onEndPointFetch}
            setStateMatches={this.setStateMatches}
            onSetStateGlobalMessage
        */
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        const {onEndPointFetch, onSetStateGlobalMessage} = this.props;
        onEndPointFetch("get",`/forreportmatch/${id}`)
        .then(match_for_report => {
            if(match_for_report.message === "data for match report retrieved successfully"){
                this.setState(match_for_report.data);
                console.log("data here", match_for_report.data);
            }
            else{
                console.log(match_for_report.data)
                onSetStateGlobalMessage(match_for_report.message)
            }
        })
        .catch(console.log);

    }

    onChangeHandle = (event) => {
        // these should be adjusted to use prev state instead of actual state
        if(event.target.name === "match_scorers"){
            this.setState({match_scorers: this.state.match_scorers.filter(scorer => scorer !== event.target.id).concat(new Array(Number(event.target.value)).fill(event.target.id))});
        }
        else if(event.target.name === "match_home_score" || event.target.name === "match_away_score"){
            this.setState({[event.target.name]: event.target.value});
        }
        else{
            this.setState({
                [event.target.name]: event.target.checked === true? this.state[event.target.name].concat([event.target.id]): this.state[event.target.name].filter(player => player !== event.target.id)
            });
        }
    }
    onSubmitHandle = (event) => {
        const {id} = this.props.match.params;
        const {onEndPointFetch, onSetStateGlobalMessage, setStateMatches} = this.props;
        event.preventDefault();
        // not really needed repoirted, but just to have full state up to date
        // this is async, so it is not updated in time to be sent to backend. need to figure it out, for now i hardcode true for it in the object to be sent, assuming when report is clicked, report should be considered as true anyway
        // this.setState({match_reported: true});
        const match_report_for_db = {
            match_players: this.state.match_players_signed_up.map(player => {
                return {
                    user_name: player,
                    part_attended: this.state.match_players_attended.includes(player),
                    part_home_team: this.state.match_home_team.includes(player),
                    part_away_team: this.state.match_away_team.includes(player),
                    part_scored: this.state.match_scorers.filter(scorer => scorer === player).length,
                }
            }),
            report_match_reported: true,
            report_home_score: this.state.match_home_score,
            report_away_score: this.state.match_away_score
        }
        onEndPointFetch("put",`/reportmatch/${id}`, match_report_for_db)
        .then(reported_match_response => {
            if(reported_match_response.message = "the match was successfully updated"){
                // redirect to the same detailed match we came from
                this.setState({redirect: `/match/${id}`});
            }
            else{
                // stay, show global message
                onSetStateGlobalMessage(reported_match_response.message)
                console.log(reported_match_response.message)
            }
        })
        // also need to fetch all matches for global state
        .then(() => {
// TODO     // this code repeats same as in create and update match
            onEndPointFetch("get")
            .then(preview_matches_response => {
                if(preview_matches_response.message === "preview matches retrieved successfully"){
                    setStateMatches(preview_matches_response.data)
                }
                else{
                    // some better error handling needed in case preview matches are not done
                    console.log(preview_matches_response.message);
                    // will set global state messages here if it doesnt work
                }
            })
            .catch(console.log);
        })
        .catch(console.log);
    }
    // prolly need split into several components this
    render(){
        console.log(this.props);
        const {match_players_signed_up} = this.state;
        
        return(
            <div>
                <h1>Match Report</h1>
                    <form onSubmit={this.onSubmitHandle}>
                        <ol>
                            {match_players_signed_up.map(player_signed_up => {
                                return (
                                <li>
                                    <span><strong>{player_signed_up} </strong></span>
                                    <span>
                                    {/* again issue with null && here */}
                                        <label htmlFor={player_signed_up}>Attended</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox" 
                                        name="match_players_attended"
                                        checked={this.state.match_players_attended.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />

                                        <label htmlFor={player_signed_up}>Home Team</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox"
                                        name="match_home_team" 
                                        checked={this.state.match_home_team.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />
                                        
                                        <label htmlFor={player_signed_up}>Away Team</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox" 
                                        name="match_away_team"
                                        checked={this.state.match_away_team.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />

                                        <label htmlFor={player_signed_up}>Scored</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="number" 
                                        min="0"
                                        name="match_scorers"
                                        value={this.state.match_scorers.filter(scorer => scorer === player_signed_up).length}
                                        onChange={this.onChangeHandle}
                                        />
                                    </span>
                                </li>)
                            })}
                        </ol>

                        <p>Score</p>

                        <label htmlFor="match_home_score">Home Score</label>
                        <input 
                        id="match_home_score" 
                        name="match_home_score" 
                        type="number" 
                        min="0"
                        value={this.state.match_home_score || 0}
                        onChange={this.onChangeHandle}
                        />
                        <label htmlFor="match_away_score">Away Score</label>
                        <input 
                        id="match_away_score" 
                        name="match_away_score" 
                        type="number" 
                        min="0"
                        value={this.state.match_away_score || 0}
                        onChange={this.onChangeHandle}
                        />
                        <br/>
                        <p>Cancel The Report</p>
                        <button>Report The Match</button>
                    </form>
{/* TODO            // should probably use that shorter conditioanl && something */}
                    {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
            </div>
        )
    }
}

export default withRouter(ReportMatch);