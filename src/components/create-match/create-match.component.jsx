import React from "react";
import { Redirect } from "react-router-dom"

import "./create-match.styles.css";

class CreateMatch extends React.Component {
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
            redirect: null,
            message: null,
        }   
    }

    onChangeHandler = (event) => {
        this.setState({match: Object.assign({}, this.state.match, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        // fetch function
        this.props.onEndPointFetch("post", "/creatematch", this.state.match)
        .then(response => {
            console.log(response);
            if(response.message === "new match created successfully"){
                this.props.setStateMatches(response.data)
                this.setState({
                match:{
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
                    away_team: [],},
                message: null,
                redirect: "/"});
            }
            else{
                this.setState({message: "Please fill all inputs"})
                console.log(response.message);
            }
        })
        .catch(console.log);
    }
    render(){

        return(
            <div className="create-match">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="match_id">Match id</label>
                    <input required id="match_id" name="match_id" type="number" 
                    // this input will be gone anyway
                    min={Math.max(...this.props.matches.map(m => m.match_id))+1} 
                    max={Math.max(...this.props.matches.map(m => m.match_id))+1} 
                    onChange={this.onChangeHandler} value={this.state.match.match_id}/>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.match_name}/>

                    <label htmlFor="date_start">Match Start</label>
                    <input required id="date_start" name="date_start" type="datetime-local" onChange={this.onChangeHandler} value={this.state.match.date_start}/>

                    <label htmlFor="date_end">Match End</label>
                    <input required id="date_end" name="date_end" type="datetime-local" onChange={this.onChangeHandler} value={this.state.match.date_end}/>

                    <label htmlFor="venue">Venue</label>
                    <input required id="venue" name="venue" type="text" onChange={this.onChangeHandler} value={this.state.match.venue}/>

                    <input type="submit" value="Submit"/>
                </form>
                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
            </div>
        )
    }
}

export default CreateMatch;