import React from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import Loading from '../common/loading';
import RecentFlyer from '../flyers/recent-flyer';
import DraftFlyer from '../flyers/draft-flyer';
import FlyersPagination from '../flyers/flyers-pagination';
import NoContent from '../common/no-content';

import getFlyers from '../../queries/get-flyers';

import {tokenControl} from '../../assets/js/functions-vars';


const FlyersList = (props) => {

    const calculateTotalPages = () => {
        let number = null;
        props.data.flyers.forEach((flyer)=>{
            if(flyer.allPosts) {
                number = flyer.allPosts;
            }
        });
        return Math.ceil(number / props.filter.limit);
    }

    const refetchFlyers = () => {
        props.data.refetch();
    }

        if(props.data.loading) {
            return (
                <div>
                    <Loading />
                </div>
            )
        }

        if(!props.data.flyers || props.data.flyers.length === 0) return <NoContent text="No flyers for selected category."/>
    
        return (
            <div>
                <div className="wrapper">
                    {
                        props.data.flyers.map(flyer => {
                            switch(flyer.flyer_status) {
                                case 0:
                                    return '';
                                case 1:
                                    return <RecentFlyer 
                                                userId={props.userId} 
                                                key={flyer.id} 
                                                flyer={flyer}/>
                                case 2:
                                    return <DraftFlyer 
                                        userId={props.userId}             
                                        key={flyer.id} 
                                        flyer={flyer}
                                        refetchFlyers={refetchFlyers}
                                        />
                                default:
                                    return <NoContent text="No flyers for selected category."/>
                            } 
                        })
                    }
                </div>
                {calculateTotalPages() >= 2 ? 
                <FlyersPagination
                    perPage={props.filter.limit}
                    totalPages={calculateTotalPages()}
                    handlePageChange={props.handlePageChange}
                    initialPage={props.initialPage}
                /> : '' }
            </div>
        )
};

FlyersList.propTypes = {
    handlePageChange: PropTypes.func,
    initialPage: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequired,
    data: PropTypes.shape({
        flyers: PropTypes.arrayOf(PropTypes.shape({
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
            flyer_update: PropTypes.string,
            id: PropTypes.string.isRequired
        })),
        filter: PropTypes.shape({
            allFlyers: PropTypes.bool.isRequired,
            draftFlyers: PropTypes.bool.isRequired,
            firstEl: PropTypes.number.isRequired,
            initialPage: PropTypes.number.isRequired,
            limit: PropTypes.number.isRequired,
            listingProperty: PropTypes.bool.isRequired,
            resentFlyers: PropTypes.bool.isRequired,
            searchText: PropTypes.string.isRequired,
            sortBy: PropTypes.number.isRequired,
            totalPages: PropTypes.number.isRequired
        }) 
    })
}

export default graphql(getFlyers, {
    options: (props) => {
        return {
            variables: {
                user: Number(props.userId),
                accessToken: tokenControl.getToken(),
                ...props.filter,
            },
            fetchPolicy: 'network-only'
        }
    }
})(FlyersList);