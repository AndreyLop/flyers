import React, {Component} from 'react';
import { graphql } from 'react-apollo';
import PropTypes from 'prop-types';

import CampaingsList from './campaign-list';
import CampaignsFilter from './campaigns-filter';

//state query
import { GET_ID } from '../../state/queries';

import { debounce } from '../../assets/js/functions-vars';

class MyCampaings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstEl: 0,
            limit: window.innerWidth < 767 ? 4 : 8,
            sortBy: 0,
            searchText: '',
            forcePage: 0
        }
    }

    clearFilter = {
        firstEl: 0,
        forcePage: 0
    }

    handleSearchTextInput = (text) => {
        this.setState({
            ...this.clearFilter,
            searchText: text
        })
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWinowresizeDebounced)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWinowresizeDebounced)
    }

    handleWindowResize = () => {
        let limit = window.innerWidth < 767 ? 4: 8;
        this.setState({limit});
    }

    handleWinowresizeDebounced = debounce(this.handleWindowResize, 200);



    handleSort = (sortby) => {
        let sort = '';
        switch(sortby) {
            case '':
                sort = 0;
                break;
            case 'lastCreatedFirst':
                sort = 1;
                break;
            case 'firstCreatedFirst':
                sort = 2;
                break;
            case 'dateOfModifying':
                sort = 3;
                break;
            case 'byNameAZ':
                sort = 4;
                break;
            case 'byNameZA':
                sort = 5;
                break;
            default:
                break;
        }
        this.setState({
            ...this.clearFilter,
            sortBy: sort
        });
    }

    handlePageChange = (firstEl, totalPages, forcePage) => {
        this.setState({
            ...this.state,
            firstEl: firstEl,
            totalPages: totalPages,
            forcePage: forcePage
        })
    }

    render() {
        return (
            <div className="my-campaigns">
                <div className="my-campaigns__heading">
                    <h1>My Campaigns</h1>
                </div>
                <CampaignsFilter 
                    handleSearchTextInput={this.handleSearchTextInput}
                    handleSort={this.handleSort}
                    filter={this.state}
                    />
                <div className="wrapper">
                    <CampaingsList
                        forcePage={this.state.forcePage} 
                        userId={this.props.data.id} 
                        filter={this.state}
                        handlePageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

MyCampaings.proptTypes = {
    data: PropTypes.shape({
        id: PropTypes.string.isRequired
    })
}

export default graphql(GET_ID)(MyCampaings);