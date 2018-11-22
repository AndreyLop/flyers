import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {

    const style1  = {
        width: props.width ? props.width + 'px' :'120px',
        height: props.width ? props.width + 'px' :'120px',
        borderWidth: props.borderWidth ? props.borderWidth + 'px' :'7px'
    }

    const style2 = {
        top: props.borderWidth ? props.borderWidth * (-1) + 'px' : '-7px',
        left: props.borderWidth ? props.borderWidth * (-1) + 'px' : '-7px',
    }

    return (
        <div className="loading">
            <div className="lds-ring" style={style1}>
                <div style={{...style1, ...style2}}></div>
                <div style={{...style1, ...style2}}></div>
                <div style={{...style1, ...style2}}></div>
                <div style={{...style1, ...style2}}></div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    width: PropTypes.number,
    borderWidth: PropTypes.number
};

export default Loading;