import React from "react";

import "./create-match.styles.css";

class CreateMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
        }   
    }
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        // fetch function
        this.props.onEndPointFetch("post", "/creatematch", this.state)
        // .then(matches => this.props.setStateMatches(matches))
        .then(console.log);
/*         this.setState({            
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
        }); */
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
                    onChange={this.onChangeHandler} value={this.state.match_id}/>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.match_name}/>

                    <label htmlFor="date_start">Match Start</label>
                    <input required id="date_start" name="date_start" type="datetime-local" onChange={this.onChangeHandler} defaultValue={new Date().toISOString().slice(0,-8)}/>

                    <label htmlFor="date_end">Match End</label>
                    <input required id="date_end" name="date_end" type="datetime-local" onChange={this.onChangeHandler} defaultValue={new Date().toISOString().slice(0,-8)}/>

                    <label htmlFor="venue">Venue</label>
                    <input required id="venue" name="venue" type="text" onChange={this.onChangeHandler} value={this.state.venue}/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default CreateMatch;