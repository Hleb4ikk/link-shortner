import styles from './ErrorPage.module.css';

import { MoveUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../../shared/Button/PrimaryButton';

export default function ErrorPage({
  statusCode,
  description,
}: {
  statusCode: number;
  description: React.ReactNode;
}) {
  const navigate = useNavigate();

  return (
    <section className={styles.notFoundSection}>
      <h1 className={styles.code}>{statusCode}</h1>
      <p className={styles.description}>{description}</p>
      <PrimaryButton
        onClick={() => navigate(-1)}
        className={styles.goBackButton}
      >
        Go back <MoveUpRight size={16} />
      </PrimaryButton>
    </section>
  );
}
