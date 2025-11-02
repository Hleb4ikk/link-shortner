import { useEffect, useRef } from 'react';
import { ChangeEvent } from 'react';
import Input from '../Input/Input';
import styles from './Search.module.css';
import { Search as SearchIcon } from 'lucide-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

export default function Search({ placeholder }: { placeholder: string }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const timeoutRef = useRef<number | null>(null);
  useEffect(() => {
    const searchValue = searchParams.get('search');

    if (searchValue && inputRef.current) {
      inputRef.current.value = searchValue;
    }
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      const urlSearchParams = new URLSearchParams(searchParams);

      if (value) {
        urlSearchParams.set('search', value);
      } else {
        urlSearchParams.delete('search');
      }

      navigate(`${location.pathname}?${urlSearchParams.toString()}`);
    }, 750);
  }

  return (
    <div className={styles.searchContainer}>
      <Input
        ref={inputRef}
        onChange={handleChange}
        placeholder={placeholder}
        className={styles.search}
      />
      <SearchIcon className={styles.searchIcon} />
    </div>
  );
}
