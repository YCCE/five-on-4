import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import "./report-match.styles.css";
import ReportMatchContent from "../../components/report-match-content/report-match-content.component";

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
            match_home_score: 0,
            match_away_score: 0,
            redirect: null,
        };
    }

    componentDidMount(){
        const {id} = this.props.match.params;
        const {fetchEndPoint, setStateGlobalMessage} = this.props;
        fetchEndPoint("get",`/forreportmatch/${id}`)
        .then(matchForReport => matchForReport.message === "data for match report retrieved successfully" && this.setState(matchForReport.data))
        .catch(matchFrRprt => {
            console.log(matchFrRprt);
            setStateGlobalMessage("there was a problem with retrieving match report")
        })
    }

    onHandleChange = (event) => {
        const {name, value, checked} = event.target;
        const {playerid} = event.target.dataset;
        if(name === "match_scorers"){
            return this.setState(prevState => ({
                [name]: prevState[name].filter(player => player.user_id !== Number(playerid)).concat({user_id: Number(playerid), user_goals: Number(value)})
            }))
        }
        else if(name === "match_players_attended" || name === "match_home_team" || name === "match_away_team"){
            return this.setState(prevState => ({
                [name]: checked? prevState[name].concat({user_id: Number(playerid)}): prevState[name].filter(player => player.user_id !== Number(playerid))
            }))
        }
        return this.setState({[name]: Number(value)});
    }
    onHandleSubmit = (event) => {
        const {id} = this.props.match.params;
        const {fetchEndPoint, setStateGlobalMessage, setStateMatches} = this.props;
        const {
            match_players_signed_up,
            match_players_attended,
            match_scorers,
            match_home_team,
            match_away_team,
            match_home_score,
            match_away_score,
        } = this.state
        event.preventDefault();
        const matchReportForDb = {
            match_players: match_players_signed_up.map(player => {
                return {
                    // mozda id ovdje?
                    user_name: player.user_name,
                    part_attended: match_players_attended.some(playerAttended => playerAttended.user_id === player.user_id),
                    part_home_team: match_home_team.some(playerHome => playerHome.user_id === player.user_id),
                    part_away_team: match_away_team.some(playerAway => playerAway.user_id === player.user_id),
                    part_scored: match_scorers.find(playerScored => playerScored.user_id === player.user_id).user_goals,
                }
            }),
            report_match_reported: true,
            report_home_score: match_home_score,
            report_away_score: match_away_score
        }
        fetchEndPoint("put",`/reportmatch/${id}`, matchReportForDb)
        .then(reportedMatchResponse => reportedMatchResponse.message === "the match report was successfully updated" && this.setState({redirect: `/match/${id}`}))
        .catch(reprtdMtchErr => {
            console.log(reprtdMtchErr);
            setStateGlobalMessage("there was a problem updating match report. please try again");
            this.setState({redirect: `/match/${id}`})
        })
        .then(() => {
            fetchEndPoint("get")
            .then(previewMatchesResponse => previewMatchesResponse.message === "preview matches retrieved successfully" && setStateMatches(previewMatchesResponse.data))
            .catch(matchesError => setStateGlobalMessage("there was an issue retrieving preview matches"))
        })
        .catch(console.log);        
    }

    // prolly need split into several components this
    render(){
        const {redirect, ...matchReport} = this.state;
        return(
            <>
                <ReportMatchContent 
                    matchReport={matchReport}
                    onHandleChange={this.onHandleChange}
                    onHandleSubmit={this.onHandleSubmit}
                    />
                {this.state.redirect && <Redirect to={this.state.redirect}/>}
            </>
            
        )
    }
}

export default withRouter(ReportMatch);