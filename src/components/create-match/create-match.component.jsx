import React from "react";

import "./create-match.styles.css";
import { matches_static } from "../../assets/database"

class CreateMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            match_id: "",
            match_name: "",
            date_start: "",
            date_end: "",
            venue: "",
        }   
    }
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        matches_static.push(this.state);
        this.setState({            
            match_id: "",
            match_name: "",
            date_start: "",
            date_end: "",
            venue: "",
        });
    }
    render(){
        
        return(
            <div className="create-match">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="match_id">Match id</label>
                    <input required id="match_id" name="match_id" type="number" min={Math.max(...matches_static.map(m => m.match_id))+1} max={Math.max(...matches_static.map(m => m.match_id))+1} onChange={this.onChangeHandler} value={this.state.match_id}/>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.match_name}/>

                    <label htmlFor="date_start">Match Start</label>
                    <input required id="date_start" name="date_start" type="datetime-local" onChange={this.onChangeHandler} value={new Date().toISOString().slice(0,-8)}/>

                    <label htmlFor="date_end">Match End</label>
                    <input required id="date_end" name="date_end" type="datetime-local" onChange={this.onChangeHandler} value={this.state.date_end}/>

                    <label htmlFor="venue">Venue</label>
                    <input required id="venue" name="venue" type="text" onChange={this.onChangeHandler} value={this.state.venue}/>

                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}

export default CreateMatch;