import React from 'react';
import PropTypes from 'prop-types';

const Step6WarningsModal = (props) => {
    const finalize = () => {
        props.closeWarningsModal();
        props.openFinalizationModal();
    }
    return (
        <div className="modal">
            <div className="step-6__modal step-6__modal_warnings">
                <h4 className="step-6__modal-heading">Warning</h4>
                <div className="step-6__modal-body">
                    <div>Are you sure you still would like</div> 
                    <div className="step-6__modal-flyer-name">{props.flyerName}</div> 
                    <div>to be generated whith some undersolved issues?</div>
                </div>
                <div className="step-6__modal-controls">
                    <button className="btn_3 btn_3-prev step-6__modal-btn" onClick={props.closeWarningsModal}>PREVIOUS</button>
                    <button className="btn_3 step-6__modal-btn" onClick={finalize}>FINALIZE</button>    
                </div> 
            </div>
        </div>
    )
};

Step6WarningsModal.propTypes = {
    flyerName: PropTypes.string.isRequired,
    closeWarningsModal: PropTypes.func.isRequired
};

export default Step6WarningsModal;