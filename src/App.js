import React from 'react';
import { Switch, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import Home from "./containers/home/home.container";
import Matches from "./containers/matches/matches.container";
import MatchDetailed from "./containers/match-detailed/match-detailed.container";
import CreateMatch from "./components/create-match/create-match.component";
import UpdateMatch from "./components/update-match/update-match.component";
import Login from "./components/login/login.component";
import Register from "./components/register/register.component";
import UserProfile from './components/user-profile/user-profile.component';

class  App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      preview_matches: [],
      logged_user: {
        id: "",
        name: "",
        email: "",
        joined_matches: [],
      },
      home_weather: {},
      message: "",
    }
  }
  componentDidMount(){

    this.onEndPointFetch("get")
    .then(preview_matches_response => {
      if(preview_matches_response.message === "preview matches retrieved successfully"){
        this.setState({preview_matches: preview_matches_response.data})
      }
      // else probably redirect to some error page with some explanation that no matches were fetched
    })
    .catch(console.log);

    // fetching weather data for home component - weather today
    this.onEndPointFetch("get", `/getweather/${String(Math.round(new Date().getTime()/1000))}`)
    .then(response => {
      if(response.message === "weather fetched successfully"){
        this.setState({home_weather: response.data})
      }
      else{
        console.log("There was an error fetching weather data")
        this.setState({message: "There was an error fetching weather data"})
      }
    })
    .catch(console.log);
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
  // fetch match weather state
  onSetStateMatchWeather = (weather_object) => {
    this.setState({match_weather: weather_object});
  }
  // fetch anything function
  onEndPointFetch = (method, param="", data) => {
    return fetch(`http://localhost:4000${param}`, {
/*     return fetch(`https://immense-inlet-39261.herokuapp.com${param}`, { */
      method: method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch(console.log);
  }


  render(){
    console.log("main state:", this.state);
    return (
      <div>
        <Header logged_user={this.state.logged_user} setStateLoggedUser={this.setStateLoggedUser}/>
        <Switch>
          <Route exact path="/">
            <Home 
              preview_matches={this.state.preview_matches} 
              logged_user={this.state.logged_user}  
              setStateMatches={this.setStateMatches} 
              onEndPointFetch={this.onEndPointFetch} 
              onSetStatePlayerMatches={this.onSetStatePlayerMatches}
              weather={this.state.home_weather}
            />
          </Route>
          <Route path="/matches">
            <Matches 
              preview_matches={this.state.preview_matches} 
              logged_user={this.state.logged_user}  
              setStateMatches={this.setStateMatches} 
              onEndPointFetch={this.onEndPointFetch} 
              onSetStatePlayerMatches={this.onSetStatePlayerMatches}
            />
          </Route>
           <Route path="/match/:id">
            <MatchDetailed 
              onEndPointFetch={this.onEndPointFetch} 
              setStateMatches={this.setStateMatches} 
              user_id={this.state.logged_user.id} 
              onSetStatePlayerMatches={this.onSetStatePlayerMatches}
              joined_matches={this.state.logged_user.joined_matches}
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
          <Route path="/register">
            <Register 
            setStateLoggedUser={this.setStateLoggedUser} 
            onEndPointFetch={this.onEndPointFetch}
            />
          </Route>
          <Route path="/profile">
            <UserProfile 
              logged_user={this.state.logged_user}
            />
          </Route>
        </Switch>

      </div>
    );
  }
}

export default App;
