import React from "react";
import { Redirect, withRouter } from "react-router-dom"

import "./update-match.styles.css";

class UpdateMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            update_match: {
                match_name: "",
                match_date_start: "",
                match_date_end: "",
                match_venue: "",
            },
            redirect: null,
        }   
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        // fetch with help of id
        this.props.onEndPointFetch("get", `/forupdatematch/${id}`)
        .then(for_update_match_response => {
            if(for_update_match_response.message === "match for update retrieved successfully"){
                this.setState({update_match: for_update_match_response.data})
            } 
            else{
                this.props.onSetStateGlobalMessage(for_update_match_response.message);
            }
        })
        .catch(console.log);
    }
    onChangeHandler = (event) => {
        this.setState({update_match: Object.assign({}, this.state.update_match, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler= (event) => {
        const { id } = this.props.match.params;
        event.preventDefault();
        // fetch function
        this.props.onEndPointFetch("put", `/updatematch/${id}`, this.state.update_match)
        .then(updated_match_response => {
            if(updated_match_response.message === "the match updated successfully"){
                this.props.onSetStateGlobalMessage(`match ${updated_match_response.data} was updated successfully`)
                this.setState({redirect: `/match/${id}`});
            }
            else{
                // this code also repeats in create match component in the same place
                this.props.onSetStateGlobalMessage(updated_match_response.message);
                console.log(updated_match_response.message);
            }
        })
        // this code repeats too, in same place in match create
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
            <div className="update-match">
                <button onClick={this.props.history.goBack}> Go Back</button>
                <form name="form" onSubmit={this.onSubmitHandler}>

                <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.update_match.match_name}/>

                    <label htmlFor="match_date_start">Match Start</label>
                    <input required id="match_date_start" name="match_date_start" type="datetime-local" onChange={this.onChangeHandler} value={this.state.update_match.match_date_start}/>

                    <label htmlFor="match_date_end">Match End</label>
                    <input required id="match_date_end" name="match_date_end" type="datetime-local" onChange={this.onChangeHandler} value={this.state.update_match.match_date_end}/>

                    <label htmlFor="match_venue">match_venue</label>
                    <input required id="match_venue" name="match_venue" type="text" onChange={this.onChangeHandler} value={this.state.update_match.match_venue}/>

                    <input type="submit" value="Submit"/>
                </form>

                {this.state.message? <p>{this.state.message}</p>: null}
                {this.state.redirect? <Redirect to={this.state.redirect}/>: null}
            </div>
        )
    }
}

export default withRouter(UpdateMatch);