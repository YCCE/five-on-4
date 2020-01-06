import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./containers/home/home.container";
import Matches from "./containers/matches/matches.container";
import MatchDetailed from "./components/match-detailed/match-detailed.component";
import CreateMatch from "./components/create-match/create-match.component";
import UpdateMatch from "./components/update-match/update-match.component";
import Login from "./components/login/login.component";

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      logged_user: {
        id: "",
        name: "",
        email: "",
        joined_matches: [],
      }
    }
  }
  componentDidMount(){
    this.onEndPointFetch("get")
    .then(matches => this.setStateMatches(matches))
  }
  // setting state data from the app
  setStateMatches = (matches=[]) => {
    this.setState({matches: matches.slice().sort((a,b) => new Date(a.date_start) - new Date(b.date_start))})
  }
  // set logged player
  setStateLoggedUser = (id="", name="", email="", joined_matches=[]) => {
    this.setState({logged_user: {id, name, email, joined_matches}})
  }
  // set state logged player's joined games
  onSetStatePlayerMatches = (matches_array) => {
    this.setState({logged_user: Object.assign({}, this.state.logged_user, {joined_matches: matches_array})})
  }
  // fetch anything function
  onEndPointFetch = (method, param="", data) => {
    return fetch(`http://localhost:4000${param}`, {
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(console.log);
  }


  render(){
    console.log(this.state.logged_user);
    return (
      <div>
        <Header logged_user={this.state.logged_user} setStateLoggedUser={this.setStateLoggedUser}/>
        <Switch>
          <Route exact path="/">
            <Home matches={this.state.matches} logged_user={this.state.logged_user}  setStateMatches={this.setStateMatches} onEndPointFetch={this.onEndPointFetch} onSetStatePlayerMatches={this.onSetStatePlayerMatches}/>
          </Route>
          <Route path="/matches">
            <Matches matches={this.state.matches} logged_user={this.state.logged_user} setStateMatches={this.setStateMatches} onEndPointFetch={this.onEndPointFetch} onSetStatePlayerMatches={this.onSetStatePlayerMatches}/>
          </Route>
           <Route path="/match/:id">
            <MatchDetailed 
            matches={this.state.matches}
            logged_user={this.state.logged_user} 
            joined_matches={this.state.logged_user.joined_matches.map(match => match.match_id)}
            setStateMatches={this.setStateMatches} 
            onEndPointFetch={this.onEndPointFetch} 
            onSetStatePlayerMatches={this.onSetStatePlayerMatches}
            />
          </Route>
          <Route path="/creatematch">
            <CreateMatch matches={this.state.matches} onEndPointFetch={this.onEndPointFetch} setStateMatches={this.setStateMatches}/>
          </Route>
          <Route path="/updatematch/:id">
            <UpdateMatch onEndPointFetch={this.onEndPointFetch} setStateMatches={this.setStateMatches}/>
          </Route>
          <Route path="/login">
            <Login 
            setStateLoggedUser={this.setStateLoggedUser} 
            onEndPointFetch={this.onEndPointFetch}
            onSetStatePlayerMatches={this.onSetStatePlayerMatches}
            />
          </Route>
        </Switch>

      </div>
    );
  }
}

export default App;
