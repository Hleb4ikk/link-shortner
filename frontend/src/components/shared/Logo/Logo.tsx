import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

import { Link2 } from 'lucide-react';

const Logo = () => {
  return (
    <Link to={'/'} className={styles.logoContainer}>
      <Link2 className={styles.logoPic} />
      <h1>Linkly</h1>
    </Link>
  );
};

export default Logo;
