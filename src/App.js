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
        id: 1,
        name: "karlo",
        email: "karlo@gmail.com",
        joined_matches: [1, 2, 4, 5, 8, 9, 10, 11],
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
  setStateLoggedUser = (id="", name="", email="", joined_matches=[]) => {
    this.setState({logged_user: {id, name, email, joined_matches}})
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
    return (
      <div>
        <Header logged_user={this.state.logged_user} setStateLoggedUser={this.setStateLoggedUser}/>
        <Switch>
          <Route exact path="/">
            <Home matches={this.state.matches} logged_user={this.state.logged_user}  setStateProperty={this.setStateProperty} />
          </Route>
          <Route path="/matches">
            <Matches matches={this.state.matches} logged_user={this.state.logged_user} setStateProperty={this.setStateProperty} />
          </Route>
           <Route path="/match/:id">
            <MatchDetailed matches={this.state.matches}/>
          </Route>
          <Route path="/creatematch">
            <CreateMatch matches={this.state.matches} onEndPointFetch={this.onEndPointFetch} setStateMatches={this.setStateMatches}/>
          </Route>
          <Route path="/updatematch/:id">
            <UpdateMatch/>
          </Route>
          <Route path="/login">
            <Login setStateProperty={this.setStateProperty}/>
          </Route>
        </Switch>

      </div>
    );
  }
}

export default App;
