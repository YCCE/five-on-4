import React from "react";
import { Redirect } from "react-router-dom"

import "./create-match.styles.css";

class CreateMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            create_match: {
                match_name: "",
                match_date_start: "",
                match_date_end: "",
                match_venue: "",
            },
            redirect: null,
        }   
    }
    onChangeHandler = (event) => {
        this.setState({create_match: Object.assign({}, this.state.create_match, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        // fetch function
        this.props.onEndPointFetch("post", "/creatematch", this.state.create_match)
        .then(create_match_response => {
            if(create_match_response.message === "new match successfully created"){
                this.props.onSetStateGlobalMessage(`match ${create_match_response.data} created successfully`)
                this.setState({redirect: "/"});
            }
            else{
                this.props.onSetStateGlobalMessage(create_match_response.message);
                console.log(create_match_response.message);
            }
        })
        // just testing here to see if i can call then and fetch all matches after i submit 
        .then((data) => {
            console.log(data);
            this.props.onEndPointFetch("get")
            .then(preview_matches_response => {
                if(preview_matches_response.message === "preview matches retrieved successfully"){
                    this.props.setStateMatches(preview_matches_response.data)
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

    render(){
        return(
            <div className="create-match">
                <form name="form" onSubmit={this.onSubmitHandler}>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.create_match.match_name}/>

                    <label htmlFor="match_date_start">Match Start</label>
                    <input required id="match_date_start" name="match_date_start" type="datetime-local" onChange={this.onChangeHandler} value={this.state.create_match.match_date_start}/>

                    <label htmlFor="match_date_end">Match End</label>
                    <input required id="match_date_end" name="match_date_end" type="datetime-local" onChange={this.onChangeHandler} value={this.state.create_match.match_date_end}/>

                    <label htmlFor="match_venue">match_venue</label>
                    <input required id="match_venue" name="match_venue" type="text" onChange={this.onChangeHandler} value={this.state.create_match.match_venue}/>

                    <input type="submit" value="Submit"/>
                </form>
                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
            </div>
        )
    }
}

export default CreateMatch;