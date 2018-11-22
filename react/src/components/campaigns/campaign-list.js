import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

// Components
import Loading from '../common/loading';
import CampaignListItem from './campaign-list-item';
import CampaingsPagination from "./campaigns-pagination";
import NoContent from '../common/no-content';

//queries
import getCampaigns from '../../queries/get-campaigns';

import {tokenControl} from '../../assets/js/functions-vars';

const CampaignsList = (props) =>  {
    const calculateTotalPages = () => {
        let number = null;
        props.data.myCampaigns.forEach((myCampaigns)=>{
            if(myCampaigns.allPosts) {
                number = myCampaigns.allPosts;
            }
        })
        return Math.ceil(number / props.filter.limit);
    }

    if(props.data.loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    if(!props.data.myCampaigns || props.data.myCampaigns.length === 0) return <NoContent text="No created campaings."/>
    
    return (
        <div>
            <div>
                <div className="campaign-list-items">
                    {props.data.myCampaigns.map(campaign => {
                        return (
                            <CampaignListItem 
                                key={Number(campaign.id)} 
                                campaign={campaign}
                                userId={props.userId}
                                />
                        )
                    })}
                </div>
                {calculateTotalPages() >= 2 ? 
                <CampaingsPagination
                    forcePage={props.forcePage} 
                    perPage={props.filter.limit}
                    totalPages={calculateTotalPages()}
                    handlePageChange={props.handlePageChange}
                /> : ''}
            </div>
        </div>
    )

}

CampaignsList.propTypes = {
    data: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        myCampaigns: PropTypes.arrayOf(PropTypes.shape({
            campaign_create: PropTypes.string.isRequired,
            campaign_subject: PropTypes.string.isRequired,
            clicks: PropTypes.number.isRequired,
            opened: PropTypes.number.isRequired,
            sent: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            flyer_preview: PropTypes.string.isRequired
        })),
        fetchMore: PropTypes.func,
        refetch: PropTypes.func,
        startPolling: PropTypes.func,
        subscribeToMore: PropTypes.func,
        updateQuery: PropTypes.func,
        variables: PropTypes.shape({
            accessToken: PropTypes.string.isRequired,
            firstEl: PropTypes.number.isRequired,
            forcePage: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            limit: PropTypes.number.isRequired,
            searchText: PropTypes.string.isRequired,
            sortBy: PropTypes.number.isRequired
        }),
        filter: PropTypes.shape({
            firstEl: PropTypes.number.isRequired,
            forcePage: PropTypes.number.isRequired,
            limit: PropTypes.number.isRequired,
            searchText: PropTypes.string.isRequired,
            sortBy: PropTypes.number.isRequired
        }),
        forcePage: PropTypes.number,
        handlePageChange: PropTypes.func,
        userId: PropTypes.string
    })
}

export default graphql(getCampaigns, {
    options: (props) => {
        return {
            variables: {
                id: Number(props.userId),
                accessToken: tokenControl.getToken(),
                ...props.filter
            },
            fetchPolicy: 'network-only'
        }
    }
})(CampaignsList);