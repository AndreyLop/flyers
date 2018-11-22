import React from 'react';
import { Link } from 'react-router-dom';

//Styes for this component in common.scss

const Authorize = () => {
    return (
        <div className="wrapper">
            <div className="authorized">
                You are not authorized for this page. Please <Link className="authorized__link" to="/login">login</Link> or <Link className="authorized__link" to="/registration">register</Link>
            </div>
        </div>
    )
}

export default Authorize;