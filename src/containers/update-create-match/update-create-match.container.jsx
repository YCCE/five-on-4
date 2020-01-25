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
        .catch(console.log)
        .then(() => {
            fetchEndPoint("get")
            .then(previewMatchesResponse => previewMatchesResponse.message === "preview matches retrieved successfully" && setStateMatches(previewMatchesResponse.data))
        // TODO // there might be an issue here where server sends response via its catch, but we dont test it here, and not logging it anywhere
        // something for future - same for joined matches and detailed
        // TODO // some redirect in case of no good - or just a message will do?
            .catch(matchesError => setStateGlobalMessage("there was an issue retrieving preview matches"))
        })
        .catch(console.log)
    }

    render(){
        const {redirect, match} = this.state;
        const {goBack} = this.props.history;
        console.log(this.state);
        console.log(match);

        return(
        <div className="update-create-match">
            <p className="button-go-back" onClick={goBack}>Go Back</p>
            <div className="update-create-grid">
                <UpdateCreateMatchForm
                    onChangeHandle={this.onChangeHandle}
                    onSubmitHandle={this.onSubmitHandle}
                    matchForUpdate={match}
                />
            </div>
            {redirect && <Redirect to={redirect}/>}
        </div>        
        )
    }
}

export default withRouter(UpdateCreateMatch);