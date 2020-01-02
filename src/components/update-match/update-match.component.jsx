import React from "react";
import { withRouter } from "react-router-dom";

import "./update-match.styles.css";
import { matches_static } from "../../assets/database"

class UpdateMatch extends React.Component {
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
    componentDidMount(){
        const { id } = this.props.match.params
        this.setState(matches_static.find(match => match.match_id === Number(id)));
    }
    onChangeHandler = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        console.log(this.state);
        console.log(matches_static.findIndex(match => match.match_id === this.state.match_id));
        matches_static[
            matches_static.findIndex(match => match.match_id === this.state.match_id)
        ] = this.state;
        
        this.setState({            
            match_id: "",
            match_name: "",
            date_start: "",
            date_end: "",
            venue: "",
        });
        console.log(matches_static);

    }
    render(){
        return(
            <div className="update-match">
                <form name="form" onSubmit={this.onSubmitHandler}>
                    <label htmlFor="match_id">Match id</label>
                    <input required id="match_id" name="match_id" type="number" readOnly value={this.state.match_id}/>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.match_name}/>

                    <label htmlFor="date_start">Match Start</label>
                    <input required id="date_start" name="date_start" type="datetime-local" onChange={this.onChangeHandler} value={this.state.date_start}/>

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

export default withRouter(UpdateMatch);