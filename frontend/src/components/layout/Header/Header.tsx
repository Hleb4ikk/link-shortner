import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const menuItems = [
  {
    text: 'Home',
    path: '/',
  },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <img src="awd" alt="12" />
      <nav>
        <ul className={styles.navigationList}>
          {menuItems.map((item) => (
            <li>
              <Link to={item.path}>{item.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
