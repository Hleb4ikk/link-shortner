import styles from './Pagination.module.css';

import Button from '../Button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../app/storage/storage';
import {
  decrement,
  increment,
  setCurrentPage,
} from '../../../app/storage/slices/paginationSlice';
import { useEffect } from 'react';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage } = useSelector((state: RootState) => state.pagination);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    const page = searchParams.get('page');

    if (page && !isNaN(Number(page))) {
      dispatch(setCurrentPage(Number(page)));
    }
  }, []);

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
