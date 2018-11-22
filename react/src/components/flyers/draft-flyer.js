import React from 'react';
import {withApollo} from 'react-apollo';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';

// images
import draftNoImage from '../../assets/img/flyers/draft-flyer-no-image.png';

import { tokenControl, getFormattedDate2, getMinImageName, iq7FlyersURL } from '../../assets/js/functions-vars';

// Mutation
import deleteFlyerMut from '../../mutations/delete-flyer';

// State mutation
import { SET_FLYER_INFO } from '../../state/mutations';

const DraftFlyer = (props) => {
    
    const minFileName = getMinImageName(props.flyer.flyer_preview);

    const flyerPreview = props.flyer.flyer_preview ? `${iq7FlyersURL}/upload/flyers_thumbnails_users/${props.userId}/template/${minFileName}` : draftNoImage;

    const editFlyer = (id) => {
        props.client.mutate({
            mutation: SET_FLYER_INFO,
            variables: {
                flyerId: id,
                flyerName: props.flyer.flyer_name
            }
        })
        .then(()=>{
            props.history.push('/dashboard/flyer/step-1');
        });
    }

    const deleteFlyer = (id) => {
        // deleting causes refetch of all flyers

        props.client.mutate({
            mutation: deleteFlyerMut,
            variables: {
                id: Number(props.userId),
                accessToken: tokenControl.getToken(),
                flyer_id: id
            }
        })
        .then(res => {
            props.refetchFlyers();
        });
    }

    return (
        <div className="draft-flyer">
            <div className="draft-flyer__head">
                <span className="draft-flyer__name">{props.flyer.flyer_name}</span>
                {/* <span className="draft-flyer__name">{props.flyer.flyer_name}</span> - <span className="draft-flyer__date">{getFormattedDate1(props.flyer.flyer_create)}</span> */}
            </div>
            <div className="draft-flyer__updated">
                {props.flyer.flyer_update ? 'Last updated ' + getFormattedDate2(props.flyer.flyer_update) : 'No updates'}
            </div>
            
            <div className="draft-flyer__data">
                <div className="draft-flyer__image">
                    <img src={flyerPreview} alt="Draft Flyer Preview"/>
                </div>
                <div className="draft-flyer__btns">
                    <span className="draft-flyer__btn btn_2" onClick={editFlyer.bind(this, Number(props.flyer.id))}>Edit flyer</span>
                    <span className="draft-flyer__btn draft-flyer__btn_delete btn_2" onClick={deleteFlyer.bind(this, Number(props.flyer.id))}>Delete flyer</span>
                </div>
                <div className="draft-flyer__message">
                    Your flyer is only partially complete. It is recommended to complete all flyer information.
                </div>
            </div>
        </div>
    )
};

DraftFlyer.propTypes = {
    flyer: PropTypes.shape({
        emailCamping: PropTypes.array,
        flyer_create: PropTypes.string.isRequired,
        flyer_name: PropTypes.string.isRequired,
        flyer_preview: PropTypes.string,
        flyer_status: PropTypes.number.isRequired,
        flyer_update: PropTypes.string,
        id: PropTypes.string.isRequired
    }),
    userId: PropTypes.string.isRequired,
    refetchFlyers: PropTypes.func
};

export default withRouter(withApollo(DraftFlyer));