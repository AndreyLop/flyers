import React from 'react';
import { Link } from 'react-router-dom';

//styles for this component are inside sass/common

const NotFound = () => {
    return (
        <div className="wrapper">
            Ooops... something went wrong, but dont panic and go <Link className="not-found__link" to="/dashboard/my-flyers">here</Link>
        </div>
    )
}

export default NotFound;