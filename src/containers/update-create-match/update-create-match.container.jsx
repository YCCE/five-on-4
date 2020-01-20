import React from "react";
import { withRouter, Redirect } from "react-router-dom";

import "./update-create-match.styles.css";
import UpdateCreateMatchForm from "../../components/update-create-match-form/update-create-match-form.component";

class UpdateCreateMatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            match: {
                match_name: "",
                match_date_start: "",
                match_date_end: "",
                match_venue: "",
            },
            redirect: null,
        }
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        const {fetchEndPoint, setStateGlobalMessage} = this.props;
        // if id exists, it is an update route, need to prepopulate inputs
        id && fetchEndPoint("get", `/forupdatematch/${id}`)
        .then(forUpdateMatchResponse => forUpdateMatchResponse.message === "match for update retrieved successfully" && this.setState({match: forUpdateMatchResponse.data}))
        .catch(matchFrUpdtErr => {
            console.log(matchFrUpdtErr);
            setStateGlobalMessage("there was a problem loading the match for update")
        })
    }

    onChangeHandle = (event) => {
        this.setState({match: Object.assign({}, this.state.match, {[event.target.name]: event.target.value})})
    }

    onSubmitHandle = (event) => {
        event.preventDefault();
        const {id} = this.props.match.params;
        const {fetchEndPoint, setStateMatches, setStateGlobalMessage} = this.props;
        const {match} = this.state;
        fetchEndPoint(id? "put": "post", id? `/updatematch/${id}`: `/creatematch`, match)
// TO DO// this pattern below might be better for dealing with unwanted cases with responses from the server
        // especially for messages about incomplete data submission
        .then(matchActionResponse => {
            (matchActionResponse.message === "the match updated successfully" || matchActionResponse.message === "new match successfully created")? 
            this.setState({redirect: `/detailedmatch/${matchActionResponse.data.match_id}`}): setStateGlobalMessage(matchActionResponse.message)
        })
        .catch(console.log);
    }

    render(){
        const {redirect, match} = this.state;
        return(
        <div>
            <h1>Update Create Match Component</h1>
            <UpdateCreateMatchForm
                onChangeHandle={this.onChangeHandle}
                onSubmitHandle={this.onSubmitHandle}
                match={match}
            />
            {redirect && <Redirect to={redirect}/>}
        </div>        
        )
    }
}

export default withRouter(UpdateCreateMatch);