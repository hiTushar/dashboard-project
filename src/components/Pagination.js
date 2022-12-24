import React, { useEffect, useState } from "react";

const DEFAULT_PAGINATION_RANGE = 5; 
const DEFAULT_PAGINATION_STEP = 1;
const ROWS_PER_PAGE_OPTIONS = [ 15, 30, 60 ];

export default function Pagination(props) {
    const { setRowsPerPage, setPageNo, pageNo, totalRows, rowsPerPage } = props;
    const [ paginationRange, setPaginationRange ] = useState(Array.from({ length: 5 }, (v, i) => i));

    const totalPages = parseInt(totalRows / rowsPerPage) + ((totalRows % rowsPerPage) ? 1 : 0);
    
    const checkDisabled = (value) => {
        switch(value) {
            case '<': 
                if(pageNo === 0) return true;
                break;

            case '>':
                if(pageNo === (totalPages - 1)) return true;
                break;

            case '<<': 
                if((pageNo - DEFAULT_PAGINATION_RANGE) < 0) return true;
                break;

            case '>>':
                if((pageNo + DEFAULT_PAGINATION_RANGE) > (totalPages - 1)) return true;
                break;
        }
        return false;
    }

    const changePage = (value) => {
        let nextPage;
        switch(value) {
            case '<': 
                nextPage = pageNo - DEFAULT_PAGINATION_STEP;
                if (nextPage < paginationRange[0]) {
                    calculatePaginationRange(-DEFAULT_PAGINATION_STEP);
                }
                break;

            case '>':
                nextPage = pageNo + DEFAULT_PAGINATION_STEP;
                if (nextPage > paginationRange[paginationRange.length - 1]) {
                    calculatePaginationRange(DEFAULT_PAGINATION_STEP);
                }
                break;

            case '<<': 
                nextPage = 0;
                calculatePaginationRange(-paginationRange[0]);
                break;

            case '>>':
                nextPage = totalPages - 1;
                calculatePaginationRange((totalPages - 1) - DEFAULT_PAGINATION_RANGE - paginationRange[0] );
                break;

            default:
                nextPage = value;  // pages start from 0 index
                break;
            }
            setPageNo(nextPage);
    }

    const calculatePaginationRange = (step) => {
        let pagesForPagination = [];
        let startPage = step !== null ? paginationRange[0] + step : 0;
        for(let i = startPage; i < startPage + DEFAULT_PAGINATION_RANGE; i++) {
            pagesForPagination.push(i);
        }
        setPaginationRange(pagesForPagination);
    }

    const changeRowsPerPage = (value) => {
        setRowsPerPage(value);
        changePage(0);
    }

    return (
        <div className="dashboard-pagination">
            <button  
                onClick={(e) => changePage(e.target.textContent)} 
                disabled={checkDisabled('<<')}
            >
                {'<<'}
            </button>
            <button  
                onClick={(e) => changePage(e.target.textContent)}
                disabled={checkDisabled('<')}
            >
                {'<'}
            </button>
            {paginationRange.map(button => <button key={button} onClick={(e) => changePage(e.target.textContent - 1)} className="page">{Number(button) + 1}</button>)}
            <button  
                onClick={(e) => changePage(e.target.textContent)}
                disabled={checkDisabled('>')}
            >
                {'>'}
            </button>
            <button  
                onClick={(e) => changePage(e.target.textContent)}
                disabled={checkDisabled('>>')}
            >
                {'>>'}
            </button>
            <select value={rowsPerPage} onChange={(e) => changeRowsPerPage(parseInt(e.target.value))}>
                {ROWS_PER_PAGE_OPTIONS.map(opt => <option key={opt}>{opt}</option>)}
            </select>
        </div>
    )
}
