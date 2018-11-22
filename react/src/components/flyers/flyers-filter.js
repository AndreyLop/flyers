import React, { Component } from 'react';
import SortBy from '../common/sort-by';
import PropTypes from 'prop-types';

class FlyersFilter extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.filter;
    }

    defaultState = {
        allFlyers: false,
        resentFlyers: false,
        draftFlyers: false,
        listingProperty: false,
        sortBy: '',
        searchText: '',
    }

    allFlyers = () => {
        this.props.allFlyers();
        this.setState({
            ...this.defaultState,
            allFlyers: true
        });
    }

    handleSort = (sortby) => {
        this.setState({sortBy: sortby});
    }

    resentFlyers = () => {
        this.props.resentFlyers();
        this.setState({
            ...this.defaultState,
            resentFlyers: true
        });
    }

    draftFlyers = () => {
        this.props.draftFlyers();
        this.setState({
            ...this.defaultState,
            draftFlyers: true
        });
    }

    listingProperty = () => {
        this.props.listingProperty();
        this.setState({
            ...this.defaultState,
            listingProperty: true
        });
    }

    handleSearchTextInput = (e) => {
        this.setState({searchText: e.target.value})
        this.props.handleSearchTextInput(e.target.value);
    }

    render() {
        return (
            <div className="flyers-filter">
                <div className="flyers-filter__wrapper wrapper">
                    <div className="flyers-filter__types">
                        <ul>
                            <li className={this.state.allFlyers ? 'active' : ''} onClick={this.allFlyers}>All flyers </li>
                            <li className={this.state.resentFlyers ? 'active' : ''} onClick={this.resentFlyers}>Recent flyers</li>
                            <li className={this.state.draftFlyers ? 'active' : ''} onClick={this.draftFlyers}>Draft flyers</li>
                            <li className={this.state.listingProperty ? 'active' : ''} onClick={this.listingProperty}>Flyers for Listing/property</li>
                        </ul>
                    </div>
                    <div className="flyers-filter__search-box">
                        <input value={this.state.searchText} onChange={this.handleSearchTextInput}  className="flyers-filter__input input" type="text" placeholder="Search" />
                        <SortBy handleSort={this.props.handleSort}/>
                    </div>
                </div>
            </div>
        )
    }
};

FlyersFilter.propTypes = {
    allFlyers: PropTypes.func.isRequired,
    draftFlyers: PropTypes.func.isRequired,
    handleSearchTextInput: PropTypes.func.isRequired,
    handleSort: PropTypes.func.isRequired,
    resentFlyers: PropTypes.func.isRequired,
    filter: PropTypes.shape({
        allFlyers: PropTypes.bool.isRequired,
        draftFlyers: PropTypes.bool.isRequired,
        firstEl: PropTypes.number.isRequired,
        initialPage: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired,
        listingProperty: PropTypes.bool.isRequired,
        resentFlyers: PropTypes.bool.isRequired,
        searchText: PropTypes.string.isRequired,
        sortBy: PropTypes.number.isRequired
    })
};

export default FlyersFilter;