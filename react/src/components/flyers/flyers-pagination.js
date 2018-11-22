import React from 'react'
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const FlyersPagination = (props) => {
    const perPage = props.perPage;

    const onPageChange = (page) => {
        props.handlePageChange(page.selected * perPage, props.totalPages, page.selected);
    }

    const getpaginationInfo = () => {
        return {
            forcePage: props.initialPage,
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
            <div className="wrapper">
                <ReactPaginate {...getpaginationInfo()} />
            </div>
        </div>
    ) 
};

FlyersPagination.propTypes = {
    handlePageChange: PropTypes.func.isRequired,
    initialPage: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
};

export default FlyersPagination;