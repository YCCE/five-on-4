import React from "react";
import { Redirect, withRouter } from "react-router-dom"

import "./update-match.styles.css";

class UpdateMatch extends React.Component {
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
            // just test here
            name: {name: "karlo"}
        }   
    }
    componentDidMount(){
        const { id } = this.props.match.params;
        // fetch with help of id
        this.props.onEndPointFetch("get", `/match/${id}`)
        .then(response => {
            if(response.message === "match found"){
                this.setState({match: response.data})
            } 
            else{
                this.setState({message: "There were issues with fetching the match. Please try again."})
            }
        })
        .catch(console.log);

/*         fetch("http://localhost:4000/something", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(1),
        }).then(response => response.json()).then(console.log); */


        this.props.onEndPointFetch("put", `/updatematch/${4}`, this.state.name)
        .then(response => console.log("tu", response))
        .catch(console.log);
    }
    onChangeHandler = (event) => {
        this.setState({match: Object.assign({}, this.state.match, {[event.target.name]: event.target.value})})
    }
    onSubmitHandler= (event) => {
        event.preventDefault();
        // fetch function
        this.props.onEndPointFetch("put", `/updatematch/${this.state.match.match_id}`, this.state.match)
        .then(response => {
            if(response.message === "match successfully updated"){
                this.props.setStateMatches(response.data)
                this.setState({
                    message: null,
                    redirect: `/match/${this.state.match.match_id}`});
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
            <p onClick={this.props.history.goBack}> Go Back</p>
              <form name="form" onSubmit={this.onSubmitHandler}>

              <label htmlFor="match_id">Match id</label>
                    <input required id="match_id" name="match_id" type="number" readOnly value={this.state.match.match_id}/>

                    <label htmlFor="match_name">Match name</label>
                    <input required id="match_name" name="match_name" type="text" onChange={this.onChangeHandler} value={this.state.match.match_name}/>

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

export default withRouter(UpdateMatch);