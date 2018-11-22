import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { graphql } from 'react-apollo';

import { GET_ID } from '../../state/queries';

// Components
import FlyersFilter from './flyers-filter';
import FlyersList from './flyers-list';

class MyFlyers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allFlyers: true,
            resentFlyers: false,
            draftFlyers: false,
            listingProperty: false,
            firstEl: 0,
            limit: 4,
            sortBy: 0,
            searchText: '',
            initialPage: 0,
        }
    }

    clearFilter = {
        allFlyers: false,
        resentFlyers: false,
        draftFlyers: false,
        listingProperty: false,
        firstEl: 0,
        initialPage: 0,
    };

    allFlyers = () => {
        this.setState({
            ...this.state,
            ...this.clearFilter,
            allFlyers: true,
        })
    };

    resentFlyers = () => {
        this.setState({
            ...this.state,
            ...this.clearFilter,
            resentFlyers: true,
        });
    };

    draftFlyers = () => {
        this.setState({
            ...this.state,
            ...this.clearFilter,
            draftFlyers: true,
        });
    };

    listingProperty = () => {
        this.setState({
            ...this.state,
            ...this.clearFilter,
            listingProperty: true
        });
    };

    handleSearchTextInput = (text) => {
        this.setState({
            ...this.clearFilter,
            searchText: text
        })
    };

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

    handlePageChange = (firstEl, totalPages, initialPage) => {
        this.setState({
            ...this.state,
            firstEl: firstEl,
            totalPages: totalPages,
            initialPage: initialPage
        });
    }

    render() {
        return (
            <div className="my-flyers">
                <div className="my-flyers__heading">
                    <h1>My Flyers</h1>
                    <div><Link className="create-flyer_btn btn_2" to="/dashboard/flyer">Create new flyer</Link></div>
                </div>
                <FlyersFilter 
                    allFlyers={this.allFlyers}
                    resentFlyers={this.resentFlyers}
                    draftFlyers={this.draftFlyers}
                    listingProperty={this.listingProperty}
                    handleSearchTextInput={this.handleSearchTextInput}
                    handleSort={this.handleSort}
                    filter={this.state}
                    />
                <FlyersList 
                    userId={this.props.data.id} 
                    filter={this.state}
                    handlePageChange={this.handlePageChange}
                    setTotalFlyers={this.setTotalFlyers}
                    initialPage={this.state.initialPage}
                    />
            </div>
        )
    }
}

export default graphql(GET_ID)(MyFlyers);