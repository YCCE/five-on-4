import React from "react";

import "./report-match.styles.css";

class ReportMatch extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            match_players_signed_up: ['user2',  'user3','user4',  'user5','user6',  'user7','user8','user9','user10','user11'],

            match_players_attended: ['user2','user5','user6',  'user7','user8','user9','user10', 'user11'],

            match_scorers: [ 'user2', 'user2', 'user8', 'user8','user5', 'user5' ],

    match_home_team: [ 'user2', 'user6', 'user5' ],

    match_away_team: [ 'user8', 'user9', 'user7', 'user10', 'user11' ],
            match_reported: false,
            match_home_score: 4,
            match_away_score: 2,
            karlo: "dah"
        };
    }
    onChangeHandle = (event) => {
        if(event.target.name === "match_scorers"){
            this.setState({match_scorers: this.state.match_scorers.filter(scorer => scorer !== event.target.id).concat(new Array(Number(event.target.value)).fill(event.target.id))});
        }
        else if(event.target.name === "match_home_score" || event.target.name === "match_away_score"){
            this.setState({[event.target.name]: event.target.value});
        }
        else{
            this.setState({
                [event.target.name]: event.target.checked === true? this.state[event.target.name].concat([event.target.id]): this.state[event.target.name].filter(player => player !== event.target.id)
            });
        }
    }
    onSubmitHandle = (event) => {
        event.preventDefault();
        this.setState({match_reported: true})
        console.log(this.state);
    }

    render(){
        const {match_players_signed_up, match_players_attended, match_scorers, match_home_team, match_away_team} = this.state;
        return(
            <div>
                <h1>Match Report</h1>
                    <form onSubmit={this.onSubmitHandle}>
                        <ol>
                            {match_players_signed_up.map(player_signed_up => {
                                return (
                                <li>
                                    <span><strong>{player_signed_up} </strong></span>
                                    <span>
                                        <label htmlFor={player_signed_up}>Attended</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox" 
                                        name="match_players_attended"
                                        checked={this.state.match_players_attended.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />

                                        <label htmlFor={player_signed_up}>Home Team</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox"
                                        name="match_home_team" 
                                        checked={this.state.match_home_team.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />
                                        
                                        <label htmlFor={player_signed_up}>Away Team</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="checkbox" 
                                        name="match_away_team"
                                        checked={this.state.match_away_team.includes(player_signed_up)}
                                        onChange={this.onChangeHandle}
                                        />

                                        <label htmlFor={player_signed_up}>Scored</label>
                                        <input 
                                        id={player_signed_up} 
                                        type="number" 
                                        min="0"
                                        name="match_scorers"
                                        value={this.state.match_scorers.filter(scorer => scorer === player_signed_up).length}
                                        onChange={this.onChangeHandle}
                                        />
                                    </span>
                                </li>)
                            })}
                        </ol>

                        <p>Score</p>

                        <label htmlFor="match_home_score">Home Score</label>
                        <input 
                        id="match_home_score" 
                        name="match_home_score" 
                        type="number" 
                        min="0"
                        value={this.state.match_home_score}
                        onChange={this.onChangeHandle}
                        />
                        <label htmlFor="match_away_score">Away Score</label>
                        <input 
                        id="match_away_score" 
                        name="match_away_score" 
                        type="number" 
                        min="0"
                        value={this.state.match_away_score}
                        onChange={this.onChangeHandle}
                        />
                        <br/>
                        <p>Cancel The Report</p>
                        <button>Report The Match</button>
                    </form>

            </div>


            









        )
    }
}

export default ReportMatch;