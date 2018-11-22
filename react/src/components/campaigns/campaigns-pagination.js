import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const CampaingsPagination = (props) => {
    const perPage = props.perPage;

    const onPageChange = (page) => {
        props.handlePageChange(page.selected * perPage, props.totalPages, page.selected);
    }

    const getpaginationInfo = () => {
        return {
            forcePage: props.forcePage,
            pageCount: props.totalPages,
            pageRangeDisplayed: 2,
            marginPagesDisplayed: 3,
            onPageChange: onPageChange,
            previousLabel: <div><div className="pagination__prev-arrow"></div> Prev {perPage}</div>,
            nextLabel: <div> Next {perPage} <div className="pagination__next-arrow"></div></div>
        }
    }

    return (
        <div className="pagination">
            <ReactPaginate {...getpaginationInfo()}/>
        </div>
    )
}

CampaingsPagination.proptTypes = {
    forcePage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    perPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
}

export default CampaingsPagination;