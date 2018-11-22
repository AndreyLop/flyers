import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { getFormattedDate3, calculatePercents, iq7FlyersURL } from '../../assets/js/functions-vars';

const CampaignListItem = (props) => {
    let { id, campaign_create, campaign_subject, clicks, opened, sent, flyer_preview } = props.campaign;
    return (
        <div className="campaign-list-item">
            <h4 className="campaign-list-item__heading">{campaign_subject}</h4>
            <div className="campaign-list-item__created">{getFormattedDate3(campaign_create)}</div>
            <div className="campaign-list-item__info">
                <div className="campaign-list-item__image">
                <img 
                    src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${props.userId}/template/${flyer_preview}`} 
                    alt="Flyer Preview"/>
                </div>
                <div className="campaign-list-item__data">
                    <ul>
                        <li>SENT <span>{sent}</span></li>
                        <li>OPENED <span>{`${calculatePercents(opened, sent)}%`}</span></li>
                        <li>CLICKS <span>{`${calculatePercents(clicks, sent)}%`}</span></li>
                    </ul>
                    <Link className="btn_2 btn_2_campaign-list-item" to={`/dashboard/my-campaigns/report/${id}`}>Campaign report</Link>
                </div>
            </div>
        </div>
    )
}

CampaignListItem.propTypes = {
    campaign: PropTypes.shape({
        campaign_create: PropTypes.string.isRequired,
        campaign_subject: PropTypes.string.isRequired,
        clicks: PropTypes.number.isRequired,
        opened: PropTypes.number.isRequired,
        sent: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        flyer_preview: PropTypes.string.isRequired
    }),
    userId: PropTypes.string.isRequired
}

export default CampaignListItem;