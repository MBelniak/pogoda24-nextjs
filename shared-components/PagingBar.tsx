'use client';
import React from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

interface PagingBarProps {
    pages: number;
    handlePageClick: (selectedItem: { selected: number }) => void;
    currentPage: number;
    mainColor: string;
    shadowColor: string;
    fontColor?: string;
    className?: string;
}

const DefaultPagingBar: React.FC<PagingBarProps> = props => {
    return (
        <div className="pagination">
            <ReactPaginate
                previousLabel={<i className={'fa fa-angle-left'} />}
                nextLabel={<i className={'fa fa-angle-right'} />}
                breakLabel={'...'}
                pageCount={props.pages}
                marginPagesDisplayed={1}
                pageRangeDisplayed={1}
                onPageChange={props.handlePageClick}
                containerClassName={`${props.className} text-lg pagingBar`}
                // subContainerClassName={'pagingBarSub'}
                activeClassName={'active'}
                previousLinkClassName={'pagingBarPrevious'}
                nextLinkClassName={'pagingBarNext'}
                forcePage={props.currentPage}
            />
        </div>
    );
};

const PagingBar = styled(DefaultPagingBar)<PagingBarProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2rem 0 0.7rem 0;

    li {
        place-items: center;
        border-radius: 0.3rem;
        box-shadow: 0 0 3px ${(props: PagingBarProps) => props.shadowColor};
        margin: 0.6rem;
    }

    li a {
        padding: 5px 10px;
        transition: 0.3s;
    }

    li:hover {
        cursor: pointer;
    }

    li:hover a {
        transition: 0.3s;
    }

    .pagingBarPrevious i,
    .pagingBarNext i {
        margin: 0 5px;
    }

    .previous.disabled,
    .next.disabled {
        display: none;
    }

    li.active:hover,
    li.active:hover a {
        cursor: default;
    }

    .pagination {
        text-align: center;
    }

    .active {
        background-color: ${(props: PagingBarProps) => props.mainColor};
        box-shadow: 0 0 5px ${(props: PagingBarProps) => props.mainColor};
    }

    li a {
        color: ${(props: PagingBarProps) => props.fontColor || `black`};
    }

    li:hover a {
        color: ${(props: PagingBarProps) => props.mainColor};
    }
    li.active a,
    li.active:hover,
    li.active:hover a {
        color: ${(props: PagingBarProps) => props.fontColor || `black`};
    }
`;

export default PagingBar;
