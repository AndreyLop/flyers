import React from 'react';
import PropTypes from 'prop-types';

import { iq7FlyersURL } from '../../assets/js/functions-vars';

// Modal for generated email preview

const Step6EmailModal = (props) => {
    return (
        <div className="modal" onClick={props.close}>
            <div className="step6-email-modal">
                <img src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${props.userId}/template/${props.flyerPreview}`} alt="Email Preview"/>
            </div>
        </div>
    )
}

Step6EmailModal.propTypes = {
    close: PropTypes.func.isRequired
};

export default Step6EmailModal;