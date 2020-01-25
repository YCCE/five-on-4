import React from 'react';
import { Switch, Route } from "react-router-dom";

import "./App.css";

import ProtectedRoute from "./components/protected-route/protected-route.component";
import Header from "./components/header/header.component";
import Home from "./containers/home/home.container";
import Matches from "./containers/matches/matches.container";
import MatchDetailed from "./containers/match-detailed/match-detailed.container";
import UserProfile from './components/user-profile/user-profile.component';
import ReportMatch from "./containers/report-match/report-match.container";
import GlobalMessage from './components/global-message/global-message.component';
import LoginRegister from "./containers/login-register/login-register.container";
import UpdateCreateMatch from "./containers/update-create-match/update-create-match.container";

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      preview_matches: [],
      logged_user: {
        user_id: "",
        user_name: "",
        user_email: "",
        user_created: "",
        user_signed_up_matches: [],
        user_attended_matches: [],
        user_in_home_team: [],
        user_in_away_team: [],
        user_matches_won_as_home: [],
        user_matches_won_as_away: [],
        user_matches_lost_as_home: [],
        user_matches_lost_as_away: [],
        user_scored_in_matches: []
      },
      message: "",
    }
  }
  componentDidMount(){

    this.fetchEndPoint("get")
    .then(preview_matches_response => {
      if(preview_matches_response.message === "preview matches retrieved successfully"){
        this.setState({preview_matches: preview_matches_response.data})
      }
      // else probably redirect to some error page with some explanation that no matches were fetched
    })
    .catch(console.log);
  }

  // setting state data from the app
  setStateMatches = (matches=[]) => {
    this.setState({preview_matches: matches})
    console.log(this.state.preview_matches);
  }
  // set logged player
  setStateLoggedUser = (user={user_id:"", user_name:"", user_email:"", user_signed_up_matches:[]}) => {
    this.setState({logged_user: user})
    console.log("user", user);
  }
  // set state logged player's joined games
  setStatePlayerMatches = (matches_array) => {
    this.setState({logged_user: Object.assign({}, this.state.logged_user, {user_signed_up_matches: matches_array})})
  }
  // fetch match weather state
  onSetStateMatchWeather = (weather_object) => {
    this.setState({match_weather: weather_object});
  }
  // set global message state
  setStateGlobalMessage = (message="") => {
    this.setState({message: message});
    setTimeout(() => this.setState({message: ""}), 2000);
  }
  // fetch anything function
  fetchEndPoint = (method, param="", data) => {
    return fetch(`https://immense-inlet-39261.herokuapp.com${param}`, {

    // return fetch(`http://localhost:4000${param}`, {
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(console.log);
  }


  render(){
    console.log("user:", this.state.logged_user);
    return (
      <div className="container">
        <Header 
          user_name={this.state.logged_user.user_name} 
          user_signed_up_matches={this.state.logged_user.user_signed_up_matches}
          setStateLoggedUser={this.setStateLoggedUser}>
            <GlobalMessage 
              message={this.state.message}
              setStateGlobalMessage={this.setStateGlobalMessage}/>
        </Header>
        <Switch>
          <Route exact path="/">
            <Home 
              preview_matches={this.state.preview_matches} 
              user_id={this.state.logged_user.user_id}  
              user_name={this.state.logged_user.user_name} 
              user_signed_up_matches={this.state.logged_user.user_signed_up_matches} 
              setStateMatches={this.setStateMatches} 
              fetchEndPoint={this.fetchEndPoint} 
              setStatePlayerMatches={this.setStatePlayerMatches}
              setStateGlobalMessage={this.setStateGlobalMessage}
            />
          </Route>
          <Route path="/matches">
            <Matches 
              preview_matches={this.state.preview_matches} 
              user_id={this.state.logged_user.user_id}  
              user_signed_up_matches={this.state.logged_user.user_signed_up_matches}
              setStateMatches={this.setStateMatches} 
              fetchEndPoint={this.fetchEndPoint} 
              setStatePlayerMatches={this.setStatePlayerMatches}
            />
          </Route>
           <Route path="/detailedmatch/:id">
            <MatchDetailed 
              user_id={this.state.logged_user.user_id} 
              user_signed_up_matches={this.state.logged_user.user_signed_up_matches}
              fetchEndPoint={this.fetchEndPoint} 
              setStateMatches={this.setStateMatches} 
              setStatePlayerMatches={this.setStatePlayerMatches}
              setStateGlobalMessage={this.setStateGlobalMessage}
            />
          </Route>
          <Route path="/creatematch">
            <ProtectedRoute user_name={this.state.logged_user.user_name}>
              <UpdateCreateMatch
                fetchEndPoint={this.fetchEndPoint}
                setStateMatches={this.setStateMatches}
                setStateGlobalMessage={this.setStateGlobalMessage}
              />
            </ProtectedRoute>
          </Route>
          <Route path="/updatematch/:id">
            <ProtectedRoute user_name={this.state.logged_user.user_name}>
              <UpdateCreateMatch
                fetchEndPoint={this.fetchEndPoint}
                setStateMatches={this.setStateMatches}
                setStateGlobalMessage={this.setStateGlobalMessage}
              />
            </ProtectedRoute>
          </Route>
          <Route path="/matchreport/:id" >
            <ProtectedRoute user_name={this.state.logged_user.user_name}>
              <ReportMatch
                fetchEndPoint={this.fetchEndPoint}
                setStateGlobalMessage={this.setStateGlobalMessage}
                setStateMatches={this.setStateMatches}
              />
            </ProtectedRoute>
          </Route>
          <Route path={"/login"}>
            <LoginRegister 
              setStateLoggedUser={this.setStateLoggedUser} 
              fetchEndPoint={this.fetchEndPoint}
              setStateGlobalMessage={this.setStateGlobalMessage}
            />
          </Route>
          <Route path={"/register"}>
            <LoginRegister 
              setStateLoggedUser={this.setStateLoggedUser} 
              fetchEndPoint={this.fetchEndPoint}
              setStateGlobalMessage={this.setStateGlobalMessage}
            />
          </Route>
          <Route path="/profile">
            <ProtectedRoute user_name={this.state.logged_user.user_name}>
              <UserProfile logged_user={this.state.logged_user}/>
            </ProtectedRoute>
          </Route>
        </Switch>

      </div>
    );
  }
}

export default App;
