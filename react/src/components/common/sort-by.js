import React, {Component} from 'react';
import PropTypes from 'prop-types';

import sortDelete from '../../assets/img/flyers/sort_delete.png';

class SortBy extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            lastCreatedFirst: false,
            firstCreatedFirst: false,
            dateOfModifying: false,
            byNameAZ: false,
            byNameZA: false,
            isOpen: false 
        }
    }

    defaultSortState = {
        lastCreatedFirst: false,
        firstCreatedFirst: false,
        dateOfModifying: false,
        byNameAZ: false,
        byNameZA: false,
        sortSelectedText: '',
        isOpen: false 
    }

    handleOpenClose = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleSortSelect = (e) => {
        if(e.target.tagName==='LI') {
            this.setState({
                ...this.defaultSortState,
                [e.target.dataset.sort] : true,
                sortSelectedText: e.target.innerHTML
            });
            this.props.handleSort(e.target.dataset.sort);
        }
    }

    handleDeleteSort = () => {
        this.setState({
            ...this.defaultSortState
        });
        this.props.handleSort('');
    }
    
    handleDocumentClick = e => {
        if(this.state.isOpen) {
            if(
                !e.target.classList.contains('sort-by__btn') ||
                !e.target.classList.contains('flyers-filter__sort')
            ) {
                this.setState({
                    isOpen: false
                })
            }
        }
    }

    componentDidMount() {
        document.querySelector('.app-container').addEventListener('click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        document.querySelector('.app-container').removeEventListener('click', this.handleDocumentClick)
    }

    render() {
        return (
            <div className="sort-by">
                <button onClick={this.handleOpenClose} className="sort-by__btn">Sort by:</button>
                {
                    this.state.sortSelectedText ? (
                        <span className="soty-by__sort-text">
                            {this.state.sortSelectedText}
                            <span onClick={this.handleDeleteSort} className="sort-by__delete-sort"><img src={sortDelete} alt="Sort delete icon" /></span>
                        </span>
                    ) : (
                        ''
                    )
                }
                <div className={"flyers-filter__sort flyers-filter__sort" +(this.state.isOpen ? '_opened' : '_closed') }>
                    <ul onClick={this.handleSortSelect}>
                        <li data-sort="lastCreatedFirst" className={this.state.lastCreatedFirst ? 'sort-by__active':''}>last created first</li>
                        <li data-sort="firstCreatedFirst" className={this.state.firstCreatedFirst ? 'sort-by__active':''}>first created first</li>
                        {!this.props.campaignsSort && <li data-sort="dateOfModifying" className={this.state.dateOfModifying ? 'sort-by__active':''}>date of modifing</li>}
                        <li data-sort="byNameAZ" className={this.state.byNameAZ ? 'sort-by__active':''}>by name A-Z</li>
                        <li data-sort="byNameZA" className={this.state.byNameZA ? 'sort-by__active':''}>by name Z-A</li>
                    </ul>
                </div>
            </div>
        )
    }
}

SortBy.propTypes = {
    handleSort: PropTypes.func.isRequired
};

export default SortBy;