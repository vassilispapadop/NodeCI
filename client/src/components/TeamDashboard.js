import React from 'react';
import { Link } from 'react-router-dom'
import MyTeam from './team/MyTeam';

const TeamDashboard = () =>{
    return(
        <div>
            <MyTeam/>
            <div className="fixed-action-btn">
                <Link to="/team/new" className="btn-floating btn-large red">
                <i className="material-icons">add</i>
                </Link>
            </div>
        </div>
    )
}

export default TeamDashboard;