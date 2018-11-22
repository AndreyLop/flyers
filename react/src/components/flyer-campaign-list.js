import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { getFormattedDate3 } from '../assets/js/functions-vars';

// Styles for this component are in assets/sass/campaign-list

const FlyerCampaignList = (props) => {

    const getStatus = (status) => {
        switch(status) {
            case 0:
                return 'Waiting for payment';
            case 1:
                return 'Pending';
            case 2:
                return 'Send';
            default:
                return;
        }
    }

    const tableHeadClasses = props.campaigns.length !== 0 ? 'campaign__table-heading campaign__table-heading_active' : 'campaign__table-heading';

    return (
            <div className="campaign__data">
                <h4 className="campaign__campaing-heading">Email campaigns</h4>
                <table className="campaign__table">
                    <thead>
                        <tr className={tableHeadClasses}>
                            <th>Schedule</th>
                            <th className="campaign__subject">Subject</th>
                            <th className="campaign__status">Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        props.campaigns.length !== 0 
                        ?
                        props.campaigns.map((campaign, index) => {
                            return (
                                <tr key={campaign.id}>
                                    <td>{getFormattedDate3(campaign.campaign_create)}</td>
                                    <td className="campaign__subject">{campaign.campaign_subject}</td>
                                    <td className="campaign__status">{getStatus(campaign.status)}</td>
                                    <td className="campaign__report"><Link to={`/dashboard/my-campaigns/report/${campaign.id}`}>Campaign Report</Link></td>
                                    <td className="campaign__report_mobile"><Link to={`/dashboard/my-campaigns/report/${campaign.id}`}>Report</Link></td>
                                </tr>
                            )
                        })
                        :
                        <tr className="flyer__no-campaings_tr">
                            <td className="flyer__no-campaings">There are no email campaigns yet. But it is never late to change it.</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
    )
};

FlyerCampaignList.propTypes = { 
    campaigns: PropTypes.arrayOf(PropTypes.shape({
        campaign_create: PropTypes.string.isRequired,
        campaign_subject: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
    }))
}

export default FlyerCampaignList;