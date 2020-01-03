import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./containers/home/home.container";
import Matches from "./containers/matches/matches.container";
import MatchDetailed from "./components/match-detailed/match-detailed.component";
import CreateMatch from "./components/create-match/create-match.component";
import UpdateMatch from "./components/update-match/update-match.component";
import Login from "./components/login/login.component";


import { users, matches_static, matches_dynamic } from './assets/database';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      active_match_id: "",
      logged_user: {
        id: 1,
        name: "karlo",
        email: "karlo@gmail.com",
        joined_matches: [1, 2, 4, 5, 8, 9, 10, 11],
      }
    }
  }
  componentDidMount(){
    this.setState({matches: matches_static.slice().sort((a,b) => new Date(a.date_start) - new Date(b.date_start))});
  }
  // setting state data from the app
  setStateProperty = (property, value="") => {
    this.setState({[property]: value});
  }
  // fetch anything function
  fetch_data = (method, params) => {
    
  }

  render(){
    return (
      <div>
        <Header logged_user={this.state.logged_user} setStateProperty={this.setStateProperty}/>
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
            <CreateMatch/>
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
