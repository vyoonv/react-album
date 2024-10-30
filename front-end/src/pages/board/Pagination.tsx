import { useRecoilState } from "recoil";
import { pageState } from "../../stores/atoms/pageState";
import styles from "../board/boardCss/BoardPagination.module.scss";

interface PaginationProps {
  totalBoards: number;
  boardsPerPage: number;
}

function Pagination({ totalBoards, boardsPerPage }: PaginationProps) {
  const [page, setPage] = useRecoilState(pageState);
  const totalPages = Math.ceil(totalBoards / boardsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageClick(page - 1)}
        className={styles.pagination__button}
      >
        <img src="src/assets/icons/icon-arrowLeft.svg" alt="" />
      </button>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={styles.pagination__button}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(page + 1)}
        className={styles.pagination__button}
      >
        <img src="src/assets/icons/icon-arrowRight.svg" alt="" />
      </button>
    </div>
  );
}

export default Pagination;
