import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const paginationRange = 10;
  const firstPage = Math.floor((currentPage - 1) / paginationRange) * paginationRange + 1;
  const lastPage = Math.min(firstPage + paginationRange - 1, totalPages);

  const pages = [];
  for (let i = 0; i < paginationRange && firstPage + i <= lastPage; i++) {
    const page = firstPage + i;
    pages.push(page);
  }

  return (
    <nav aria-label="pagination">
      <ul className="flex items-center justify-center h-10 text-base gap-1 mt-6">
        {firstPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(firstPage - 1)}
              className="flex items-center justify-center w-8 h-10 rounded-xl text-white hover:text-emerald-500 hover:font-pretendardBold"
            >
              <FaAngleLeft color="white" />
            </button>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center w-8 h-10 rounded-xl ${
                currentPage === page
                  ? "border-emerald-600 border-2 text-emerald-600 font-pretendardBold"
                  : "hover:bg-zinc-200 hover:bg-opacity-20  text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        {lastPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(lastPage + 1)}
              className="flex items-center justify-center w-8 h-10 rounded-xl text-white hover:text-emerald-500 hover:font-pretendardBold"
            >
              <FaAngleRight color="white" />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
