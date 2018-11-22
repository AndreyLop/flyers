import React from 'react';
import PropTypes from 'prop-types';

//styles for this component are in sass/common

const NoContent = ({text}) => {
    return (
        <div className="wrapper">
            <div className="no-content">
                {text}
            </div>
        </div>
    )
};

NoContent.propTypes = {
    text: PropTypes.string
};

export default NoContent;