import React, {Component} from 'react';
import {withApollo} from 'react-apollo';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles for this component are in assets/sass/flyer

// Components
import Loading from '../common/loading';
import FlyerCampaignList from '../flyer-campaign-list';

//query
import {getReadyFlyer} from '../../queries/open-flyer';

import {tokenControl, getFormattedDate2, iq7FlyersURL} from '../../assets/js/functions-vars';

//state mutation
import { SET_FLYER_ID_AND_FLYER_IMAGE_NAME } from '../../state/mutations';


class ReadyFlyer extends Component {

    state = {
        loading: true
    }
    
    componentDidMount() {
        this.props.client.query({
            query: getReadyFlyer,
            variables: {
                id: Number(this.props.core.userId),
                flyer_id: this.props.core.flyerId,
                typ: 7,
                accessToken: tokenControl.getToken()
            },
            fetchPolicy: 'network-only'
        })
        .then(res => {
            const {flyer_create, flyer_preview, flyer_update } = res.data.openFlyer.infoFlyer;
            const campaigns = [...res.data.openFlyer.infoFlyer.emailCamping];
            this.setState({
                loading: false,
                created: flyer_create,
                finalized: flyer_update,
                flyer_preview: flyer_preview,
                campaigns: campaigns
            });

        })
    }

    goToEmail = (id) => {
        this.props.client.mutate({
            mutation: SET_FLYER_ID_AND_FLYER_IMAGE_NAME,
            variables: {
                flyerId: Number(this.props.core.flyerId),
                flyerImageName: this.state.flyer_preview,
            }
        })
        .then(()=>{
            this.props.history.push('/dashboard/campaign');
        })
    }

   

    render() {
        const linkToImage = `${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/template/${this.state.flyer_preview}`;
        const lnikForShare = `${this.props.core.userId}/template/${this.state.flyer_preview}`;
        const linkToPdf = linkToImage.replace(/\.(gif|jpg|jpeg|tiff|png)$/i, '.pdf');
        return (
            <div className="wrapper">
                {
                    this.state.loading ? (
                        <Loading />
                    ) : (
                        <div className="ready-flyer">
                            <h4 className="ready-flyer__heading">Your new flyer is ready - email it to thousands of real estate professionals now!</h4>
                            <div className="ready-flyer__dates">
                                <div><span>Created</span> {getFormattedDate2(this.state.created)}</div>
                                <div><span>Finalized</span> {getFormattedDate2(this.state.finalized)}</div>
                            </div>
                            <div className="ready-flyer__body">
                                <div className="ready-flyer__image">
                                <img 
                                    src={`${iq7FlyersURL}/upload/flyers_thumbnails_users/${this.props.core.userId}/template/${this.state.flyer_preview}`} 
                                    alt="Flyer Preview"/>
                                </div>
                                <div className="ready-flyer__controls">
                                    <div className="ready-flyer__buttons">
                                        <a  href={linkToPdf}
                                            download
                                            className="ready-flyer__btn btn_2">Home/office printer</a>
                                        <a  href={linkToPdf}
                                            download
                                            className="ready-flyer__btn btn_2">Commercial printing</a>
                                        <Link to={`/share/${lnikForShare}`} className="ready-flyer__btn btn_2">Share your flyer</Link>
                                        <span onClick={()=>this.goToEmail(Number(this.props.core.flyerId))} className="ready-flyer__btn btn_2">Email flyer</span>
                                    </div>
                                </div>
                                <FlyerCampaignList campaigns={this.state.campaigns} />
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
};

ReadyFlyer.propTyesp = {
    core: PropTypes.shape({
        flyerId: PropTypes.number.isRequired,
        flyerName: PropTypes.string.isRequired,
        typ: PropTypes.number.isRequired,
        userId: PropTypes.string.isRequired
    })
};

export default withApollo(ReadyFlyer);