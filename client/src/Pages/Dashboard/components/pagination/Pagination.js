import React from "react";

const Pagination = ({ alertsPerPage, totalAlerts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAlerts / alertsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">
        {pageNumbers.map((num) => (
          <li className="page-item">
            <a
              className="page-link"
              tabIndex={"-" + num}
              onClick={() => paginate(num)}
              href="#"
            >
              {num}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
