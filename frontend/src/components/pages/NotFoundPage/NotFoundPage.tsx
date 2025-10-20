import styles from './NotFoundPage.module.css';

import { MoveUpRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryButton from '../../shared/Button/PrimaryButton';

export default function NotFoundPage() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <section className={styles.notFoundSection}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.description}>
        Page <span className={styles.pathname}>{location.pathname}</span> was't
        found.
      </p>
      <PrimaryButton
        onClick={() => navigate(-1)}
        className={styles.goHomeButton}
      >
        Go back <MoveUpRight size={16} />
      </PrimaryButton>
    </section>
  );
}
