import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./containers/home/home.container";
import Matches from "./containers/matches/matches.container";
import MatchDetailed from "./components/match-detailed/match-detailed.component";
import CreateMatch from "./components/create-match/create-match.component";
import UpdateMatch from "./components/update-match/update-match.component";


import { users, matches_static, matches_dynamic } from './assets/database';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matches: [],
      active_match_id: "",
    }
  }
  componentDidMount(){
    this.setState({matches: matches_static.slice().sort((a,b) => new Date(a.date_start) - new Date(b.date_start))});
  }
  // setting state data 
  setStateProperty = (property, value="") => {
    this.setState({[property]: value});
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home matches={this.state.matches}/>
          </Route>
          <Route path="/matches">
            <Matches matches={this.state.matches}/>
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
        </Switch>

            
              {/* <MatchPreview/> */}
                {/* <MatchDetailed */}
            {/* <Matches/> */}
              {/* <MatchPreview/> */}
                {/* <MatchDetailed */}
            {/* <CreateMatch/> */}


      </div>
    );
  }
}

export default App;
