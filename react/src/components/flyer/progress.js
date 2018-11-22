import React from 'react';
import PropTypes from 'prop-types';

import {Link} from 'react-router-dom';

const Progress = (props) => {

    const steps = 6;
    const step = props.step || 1;
    const text = ['Property photos', 'Property info', 'Extra info', 'Realtor info', 'Company info', 'Finalization'];

    const constructSteps = () => {
        let markup = [];
        for(let i = 1; i <= steps; i++) {
            let className = 'progress-step';
            if(i === step) {
                className = 'progress-step_active ' + className;
            } 
            if(i < step) {
                className = 'progress-step_filled ' + className;
            }
            markup.push( 
            (
            <li onClick={props.sendInfo} className={className} key={i}>
                <Link to={`/dashboard/flyer/step-${i}`}>
                    <div className="progress-step__number">{i}</div>
                    <div className="progress-step__text">{text[i - 1]}</div>
                </Link>
            </li>
            )
        )
        }
        return markup;
    }

    return (
        <div className="progress__wrapper">
            <div className="progress">
                <ul>
                    {constructSteps()}
                </ul>
            {/* <div className="progress__line"></div> */}
            </div>
        </div>
    )
    
};

Progress.propTypes = {
    sendInfo: PropTypes.func,
    step: PropTypes.number.isRequired
};

export default Progress;