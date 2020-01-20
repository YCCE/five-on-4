import React from "react";

import "./update-create-match-form.styles.css";

const UpdateCreateMatchForm = ({match, onChangeHandle, onSubmitHandle}) => {
    const {match_id, match_name, match_date_start, match_date_end, match_venue} = match;
    return(
        <div>
            <h1>Update Create Match Form Component</h1>
            <div>
                <form name="form" onSubmit={onSubmitHandle}>
                    <label>Match name
                        <input required id="match_name" name="match_name" 
                            type="text" onChange={onChangeHandle} 
                            value={match_name}/>
                    </label>
                    <label>Match Start
                        <input required id="match_date_start" 
                            name="match_date_start" type="datetime-local" 
                            onChange={onChangeHandle} 
                            value={match_date_start}/>
                    </label>
                    <label>Match End
                        <input required id="match_date_end" name="match_date_end" 
                            type="datetime-local" onChange={onChangeHandle} 
                            value={match_date_end}/>
                    </label>
                    <label>Match_venue
                        <input required id="match_venue" name="match_venue" 
                            type="text" onChange={onChangeHandle} 
                            value={match_venue}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        </div>
    )
}

export default UpdateCreateMatchForm;