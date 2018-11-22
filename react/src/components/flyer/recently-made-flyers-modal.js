import React from 'react';
import PropTypes from 'prop-types';

const RecentlyMadeFlyersModal = (props) =>{
    return (
        <div className="modal" onClick={props.closeModal}>
            <div className="recently-made-flyers-carousel-modal">
                <img src={props.img} alt="Flyer preview"/>
            </div>
        </div>
    )
};

RecentlyMadeFlyersModal.propTypes = {
    closeModal: PropTypes.func.isRequired
};

export default RecentlyMadeFlyersModal;