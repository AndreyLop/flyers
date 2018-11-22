import React from 'react';
import { graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

//components
import Loading from '../common/loading';

//query to get userId from app state
import { GET_ID } from '../../state/queries';

//query to get campaign
import getCampaignInfo from '../../queries/get-campaign';

import { tokenControl, getFormattedDate3, calculatePercents, iq7FlyersURL} from '../../assets/js/functions-vars';

const CampaignReport = (props) => {

    const campaign_name = props.data.reportCampaign ? props.data.reportCampaign[0].campaign_name : '';
    const sent = props.data.reportCampaign ? props.data.reportCampaign[0].sent : '';
    const opened = props.data.reportCampaign ? props.data.reportCampaign[0].opened : '';
    const clicks = props.data.reportCampaign ? props.data.reportCampaign[0].clicks : '';
    const campaign_subject = props.data.reportCampaign ? props.data.reportCampaign[0].campaign_subject : '';
    const flyer_preview = props.data.reportCampaign ? props.data.reportCampaign[0].flyer_preview : '';
    const sent_date = props.data.reportCampaign ? props.data.reportCampaign[0].sent_date : '';
    const campaign_list = props.data.reportCampaign ? props.data.reportCampaign[0].campaign_list : '';
    const transaction = props.data.reportCampaign ? props.data.reportCampaign[0].transaction : '';
    
    return (

        <div className="campaign-report wrapper">
            <h1 className="campaign-report__heading">Campaign report</h1>
            {
                props.data.loading ? (
                    <Loading />
                ) : (
                    <div className="campaign-report__body">
                        <div className="campaign-report__body-top">
                            <div className="campaign-report__body-top-info">
                                <div className="campaign-report__campaign-name">{campaign_name}</div>
                                {sent_date && <div className="campaign-report__sent-on">{'on ' +  getFormattedDate3(sent_date)}</div>}
                                <div className="campaign-report__subject">{campaign_subject}</div>
                            </div>
                            {transaction && 
                            <div>
                                Transaction number: <span className="campaign-report__transaction-number">{transaction}</span>
                            </div>
                            }
                        </div>
                        
                        <div className="campaign-report__data">
                            <div className="campaign-report__image">
                            <img 
                                src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${props.data.variables.id}/template/${flyer_preview}`} 
                                alt="Flyer Preview"/>
                            </div>
                            <div className="campaign-report__numbers">
                                <h4>Report:</h4>
                                <div className="campaign-report__numbers-text">
                                    <h6 className="campaign-report__h6-sub-heading">sent</h6>
                                    <p><span className="campaign-report__numbers-numbers">{sent}</span> emails sent for the lists you selected</p>
                                    <h6 className="campaign-report__h6-sub-heading">opened</h6>
                                    <p><span className="campaign-report__numbers-numbers">{calculatePercents(opened, sent)}%</span> of recipients opened the email </p>
                                    <p>total opens <span className="campaign-report__numbers-numbers">{opened}</span></p>
                                    <h6 className="campaign-report__h6-sub-heading">clicks</h6>
                                    <p><span className="campaign-report__numbers-numbers">{calculatePercents(clicks, sent)}%</span> of openers clicked a link in the email</p>
                                    <p>total clicks <span className="campaign-report__numbers-numbers">{clicks}</span></p>
                                </div>
                            </div>
                            <div className="campaign-report__distributors">
                                <h4>Selected distribution lists</h4>
                                <ul>
                                    {
                                        campaign_list.map((distributor, i) => {
                                            return <li key={i}>{distributor}</li>
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

CampaignReport.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        reportCampaign: PropTypes.arrayOf(PropTypes.shape({
            campaign_list: PropTypes.arrayOf(PropTypes.string),
            campaign_name: PropTypes.string,
            campaign_subject: PropTypes.string,
            clicks: PropTypes.number.isRequired,
            opened: PropTypes.number.isRequired,
            sent: PropTypes.number.isRequired,
            flyer_preview: PropTypes.string.isRequired,
            transaction: PropTypes.string.isRequired,
            sent_date: PropTypes.string
        }))
    })
}

export default compose(

    graphql(GET_ID),

    graphql(getCampaignInfo, {
        options: (props) => {
            return {
                variables: {
                    id: Number(props.data.id),
                    accessToken: tokenControl.getToken(),
                    campaign_id: Number(props.match.params.id)
                }
            }
        }
    })
)(CampaignReport);