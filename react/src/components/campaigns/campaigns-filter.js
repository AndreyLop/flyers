import React, { Component } from 'react';
import SortBy from '../common/sort-by';
import PropTypes from 'prop-types';

class CampaignsFilter extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.filter;
    }

    defaultState = {
        sortBy: '',
        searchText: '',
    }


    handleSort = (sortby) => {
        this.setState({sortBy: sortby});
    }


    handleSearchTextInput = (e) => {
        this.setState({searchText: e.target.value})
        this.props.handleSearchTextInput(e.target.value);
    }

    render() {
        return (
            <div className="campaings-filter">
                <div className="campaings-filter__wrapper  wrapper">
                    <h5 className="campaings-filter__heading">All campaigns</h5>
                    <div>
                        <input value={this.state.searchText} onChange={this.handleSearchTextInput}  className="flyers-filter__input input" type="text" placeholder="Search" />
                        <SortBy handleSort={this.props.handleSort} campaignsSort={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

CampaignsFilter.propTypes = {
    filter: PropTypes.shape({
        firstEl: PropTypes.number.isRequired,
        forcePage: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired,
        searchText: PropTypes.string.isRequired,
        sortBy: PropTypes.number.isRequired
    }),
    handleSearchTextInput: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired
}

export default CampaignsFilter;