import React from "react";
import _ from "lodash";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log('currentPage', currentPage);

  if (pagesCount <= 1) return null;

  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Movies page navigation">
      <ul className="pagination">
        {pages.map(page => (
          <li className={ page === currentPage ? 'page-item active' : 'page-item' } key={page}>
            <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
