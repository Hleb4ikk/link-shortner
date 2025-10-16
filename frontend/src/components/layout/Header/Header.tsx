import {
  NavigationItem,
  NavigationMenu,
} from '../../shared/NavigationMenu/NavigationMenu';
import styles from './Header.module.css';
import Logo from '../../shared/Logo/Logo';
import { Sun } from 'lucide-react';
import Button from '../../shared/Button/Button';
import AuthAlert from '../../features/auth/AuthAlert/AuthAlert';

const menuItems = [
  {
    text: 'Home',
    path: '/',
  },
  {
    text: 'Links',
    path: '/links',
  },
];

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Logo />
        <NavigationMenu>
          {menuItems.map((item) => (
            <NavigationItem to={item.path}>{item.text}</NavigationItem>
          ))}
        </NavigationMenu>
        <div className={styles.usersMenu}>
          <Button className={styles.themeSwitcher}>
            <Sun className={styles.icon} />
          </Button>
          <AuthAlert />
        </div>
      </header>
    </div>
  );
}
