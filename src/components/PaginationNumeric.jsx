import React from 'react';
import PropTypes from 'prop-types';

function PaginationNumeric({ pagination, handleChangeCurrentPage }) {
  return (
    <>
      <div className="flex justify-center">
        <nav className="flex" role="navigation" aria-label="Navigation">
          <div className="mr-2">
            <button
              type="button"
              className={`
                inline-flex
                items-center
                justify-center
                rounded
                leading-5
                px-2.5
                py-2
                bg-white
                border
                border-slate-200
                text-slate-600
                shadow-sm
                ${!pagination.firstPage && 'hover:bg-blue-500 hover:text-white'}
                ${pagination.firstPage && 'cursor-not-allowed text-slate-300'}
              `}
              disabled={pagination.firstPage}
              onClick={() => handleChangeCurrentPage(pagination.currentPage - 1)}
            >
              <span className="sr-only">Previous</span>
              <wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M9.4 13.4l1.4-1.4-4-4 4-4-1.4-1.4L4 8z" />
              </svg>
            </button>
          </div>
          <ul className="inline-flex text-sm font-medium -space-x-px shadow-sm">
            <button type="button" onClick={() => handleChangeCurrentPage(1)}>
              <span
                className={`
                  inline-flex
                  items-center
                  justify-center
                  leading-5
                  px-3.5
                  py-2
                  bg-white
                  hover:bg-blue-500
                  border
                  border-slate-200
                  text-slate-600
                  hover:text-white ${pagination.currentPage === 1 && 'bg-blue-500 text-white'}
                `}
              >
                1
              </span>
            </button>

            {pagination.currentPage >= 4 && (
              <li>
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white border border-slate-200 text-slate-600">…</span>
              </li>
            )}

            {pagination.prevPage && pagination.prevPage >= 2 && (
              <button type="button" onClick={() => handleChangeCurrentPage(pagination.prevPage)}>
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white">
                  {pagination.prevPage}
                </span>
              </button>
            )}
            {pagination.currentPage !== 1 && pagination.currentPage !== pagination.totalPages && (
              <button type="button" onClick={() => handleChangeCurrentPage(pagination.currentPage)}>
                <span
                  className={`
                  inline-flex
                  items-center
                  justify-center
                  leading-5
                  px-3.5
                  py-2
                  bg-white
                  hover:bg-blue-500
                  border
                  border-slate-200
                  text-slate-600
                  hover:text-white ${
                    pagination.currentPage !== pagination.totalPages
                    && pagination.currentPage !== pagination.firstPage
                    && 'bg-blue-500 text-white'
                  }
                `}
                >
                  {pagination.currentPage}
                </span>
              </button>
            )}
            {pagination.nextPage && pagination.nextPage <= pagination.totalPages - 1 && (
              <button type="button" onClick={() => handleChangeCurrentPage(pagination.nextPage)}>
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white hover:bg-blue-500 border border-slate-200 text-slate-600 hover:text-white">
                  {pagination.nextPage}
                </span>
              </button>
            )}

            {pagination.currentPage <= pagination.totalPages - 3 && (
              <li>
                <span className="inline-flex items-center justify-center leading-5 px-3.5 py-2 bg-white border border-slate-200 text-slate-600">…</span>
              </li>
            )}

            <button type="button" onClick={() => handleChangeCurrentPage(pagination.totalPages)}>
              <span
                className={`
                  inline-flex
                  items-center
                  justify-center
                  leading-5
                  px-3.5
                  py-2
                  bg-white
                  hover:bg-blue-500
                  border
                  border-slate-200
                  text-slate-600
                  hover:text-white ${pagination.currentPage === pagination.totalPages && 'bg-blue-500 text-white'}
                `}
              >
                {pagination.totalPages}
              </span>
            </button>
          </ul>
          <div className="ml-2">
            <button
              type="button"
              className={`
                inline-flex
                items-center
                justify-center
                rounded
                leading-5
                px-2.5
                py-2
                bg-white
                border
                border-slate-200
                text-slate-600
                shadow-sm
                ${!pagination.lastPage && 'hover:bg-blue-500 hover:text-white'}
                ${pagination.lastPage && 'cursor-not-allowed text-slate-300'}
              `}
              disabled={pagination.lastPage}
              onClick={() => handleChangeCurrentPage(pagination.currentPage + 1)}
            >
              <span className="sr-only">Next</span>
              <wbr />
              <svg className="h-4 w-4 fill-current" viewBox="0 0 16 16">
                <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      <div className="flex justify-center">
        <div className="text-sm text-slate-500 text-center sm:text-left py-2">
          <span className="font-medium text-slate-600">1</span>
          {' '}
          a
          {' '}
          <span className="font-medium text-slate-600">10</span>
          {' '}
          de
          {' '}
          <span className="font-medium text-slate-600">{pagination.totalResults}</span>
          {' '}
          resultados
        </div>
      </div>
    </>
  );
}

PaginationNumeric.propTypes = {
  pagination: PropTypes.shape({
    currentPage: PropTypes.number,
    firstPage: PropTypes.bool,
    lastPage: PropTypes.bool,
    limitValue: PropTypes.number,
    nextPage: PropTypes.number,
    outOfRange: PropTypes.bool,
    prevPage: PropTypes.number,
    totalPages: PropTypes.number,
    totalResults: PropTypes.number,
  }).isRequired,
  handleChangeCurrentPage: PropTypes.func.isRequired,
};

export default PaginationNumeric;
