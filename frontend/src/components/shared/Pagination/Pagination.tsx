import styles from './Pagination.module.css';

import Button from '../Button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/storage/storage';

import { useEffect } from 'react';

import { PaginationObject } from '../../../types/PaginationObject';

export default function Pagination({
  setCurrentPage,
  increment,
  decrement,
  totalPages,
  currentPage,
}: PaginationObject) {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get('page');
    console.log('change');
    if (page && !isNaN(Number(page))) {
      dispatch(setCurrentPage(Number(page)));
    }
  }, [searchParams]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(searchParams);

    urlSearchParams.set('page', currentPage.toString());
    navigate(`${location.pathname}?${urlSearchParams.toString()}`);
  }, [currentPage]);

  return (
    <div className={styles.pagination}>
      {currentPage - 1 > 0 && (
        <Button onClick={() => dispatch(decrement())}>
          <ChevronLeft className={styles.chevron} />
          Previous
        </Button>
      )}
      {currentPage - 1 > 0 && (
        <Button onClick={() => dispatch(decrement())}>{currentPage - 1}</Button>
      )}

      <Button className={styles.currentPage}>{currentPage}</Button>
      {currentPage + 1 <= totalPages && (
        <Button onClick={() => dispatch(increment())}>{currentPage + 1}</Button>
      )}

      {currentPage + 1 <= totalPages && (
        <Button onClick={() => dispatch(increment())}>
          Next
          <ChevronRight className={styles.chevron} />
        </Button>
      )}
    </div>
  );
}
