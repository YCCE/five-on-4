import React from "react";
import { withRouter } from "react-router-dom";

import "./update-create-match-form.styles.css";

const UpdateCreateMatchForm = ({matchForUpdate, onChangeHandle, onSubmitHandle, location}) => {
    const {match_name, match_date_start, match_date_end, match_venue} = matchForUpdate;
    const {pathname} = location;
    console.log(matchForUpdate);

    return(
        <div className="update-create-view">
            <h1 className="update-create-title">{pathname === "/creatematch"? "Create Match": "Update Match"}</h1>
            <form className="update-create-form" name="form" onSubmit={onSubmitHandle}>
                <label htmlFor="match_name" className="update-create-label-name">Match name</label>
                <input 
                    className="update-create-name"
                    required id="match_name" name="match_name" 
                    type="text" onChange={onChangeHandle} 
                    value={match_name}/>
                
                <label htmlFor="start" className="update-create-label-start">Match Start</label>
                <input 
                    className="update-create-start"
                    required id="match_date_start" 
                    name="match_date_start" type="datetime-local" 
                    onChange={onChangeHandle} 
                    value={match_date_start}/>
                
                <label htmlFor="end" className="update-create-label-end">Match End</label>
                <input 
                    className="update-create-end"
                    required id="match_date_end" name="match_date_end" 
                    type="datetime-local" 
                    min={match_date_start}
                    onChange={onChangeHandle} 
                    value={match_date_end}/>

                <label htmlFor="venue" className="update-create-label-venue">Match Venue</label>
                <input 
                    className="update-create-venue"
                    required id="match_venue" name="match_venue" 
                    type="text" onChange={onChangeHandle} 
                    value={match_venue}/>
                
                <input className="update-create-button" type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default withRouter(UpdateCreateMatchForm);