import styles from './NavigationMenu.module.css';
import { Link } from 'react-router-dom';

const NavigationMenu = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <nav className={`${styles.navigation} ${className}`}>{children}</nav>;
};

const NavigationItem = ({
  className,
  to,
  children,
}: {
  className?: string;
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <Link className={`${styles.navigationItem} ${className}`} to={to}>
      {children}
    </Link>
  );
};

export { NavigationMenu, NavigationItem };
