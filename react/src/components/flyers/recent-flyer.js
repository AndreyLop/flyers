import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {withApollo} from 'react-apollo';
import PropTypes from 'prop-types';

// Components
import FlyerCampaignList from '../flyer-campaign-list';

import { getFormattedDate3,getMinImageName, iq7FlyersURL } from '../../assets/js/functions-vars';

import { SET_FLYER_ID_AND_FLYER_IMAGE_NAME, SET_APP_TEST_STATE } from '../../state/mutations';

const RecentFyler = (props) => {

    const appTestState = props.flyer.development ? true: false;

    const goToEmail = (id) => {
        props.client.mutate({
            mutation: SET_FLYER_ID_AND_FLYER_IMAGE_NAME,
            variables: {
                flyerId: id,
                flyerImageName: props.flyer.flyer_preview,
            }
        })
        .then(() => {
            return props.client.mutate({
                mutation: SET_APP_TEST_STATE,
                variables: {
                    appTestState: appTestState
                }
            })
        })
        .then(()=>{
            props.history.push('/dashboard/campaign');
        })
    }
    const minFileName = getMinImageName(props.flyer.flyer_preview);
    const linkToImage = `${iq7FlyersURL}/upload/flyers_thumbnails_users/${props.userId}/template/${minFileName}`;
    const lnikForShare = `${props.userId}/template/${props.flyer.flyer_preview}`;
    const linkToPdf = linkToImage.replace(/\.(gif|jpg|jpeg|tiff|png)$/i, '.pdf');

    return (
        <div className="flyer-recent">
            <div className="flyer-recent__controls">
                <div className="flyer-recent__name">{props.flyer.flyer_name}</div>
                <div className="flyer-recent__creation-date">Created {getFormattedDate3(props.flyer.flyer_create)}</div>
                <div className="flyer-recent__image-btns">
                    <div className="flyer-recent__image">
                        <img 
                            src={linkToImage} 
                            alt="Flyer Preview"/>
                    </div>
                    <div className="flyer-recent__buttons">
                        <a  href={linkToPdf}
                            target="_blank"
                            className="flyer-recent__btn btn_2">Home/office printer</a>
                        <a  href={linkToPdf}
                            target="_blank"
                            className="flyer-recent__btn btn_2">Commercial printing</a>
                        <Link to={`/share/${lnikForShare}`} className="flyer-recent__btn btn_2">Share your flyer</Link>
                        <span onClick={()=>goToEmail(Number(props.flyer.id))} className="flyer-recent__btn btn_2">Email flyer</span>
                    </div>
                </div>
            </div>
            <div className="flyer-recent__campaings">
                <FlyerCampaignList campaigns={props.flyer.emailCamping}/>
            </div>
        </div>
    );
};

RecentFyler.propTypes = {
    flyer: PropTypes.shape({
        allPosts: PropTypes.number,
        emailCamping: PropTypes.arrayOf(PropTypes.shape({
            campaign_create: PropTypes.string,
            campaign_subject: PropTypes.string,
            id: PropTypes.number.isRequired,
            status: PropTypes.number.isRequired
        })),
        flyer_create: PropTypes.string.isRequired,
        flyer_name: PropTypes.string,
        flyer_preview: PropTypes.string,
        flyer_status: PropTypes.number.isRequired,
        flyer_update: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
    }),
    userId: PropTypes.string.isRequired
};

export default withRouter(withApollo(RecentFyler));