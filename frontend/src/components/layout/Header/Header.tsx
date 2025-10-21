import {
  NavigationItem,
  NavigationMenu,
} from '../../shared/NavigationMenu/NavigationMenu';
import styles from './Header.module.css';
import Logo from '../../shared/Logo/Logo';
import { Sun } from 'lucide-react';
import Button from '../../shared/Button/Button';
import AuthAlert from '../../features/auth/AuthAlert/AuthAlert';
import Avatar from '../../shared/Avatar/Avatar';
import {
  DropDownElement,
  DropDownElementContent,
} from '../../shared/DropDownElement/DropDownElement';
import { LogOut, Pencil } from 'lucide-react';
import Separator from '../../shared/Separator/Separator';

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
        <DropDownElement trigger={<Avatar accountName="Hleb" />}>
          <DropDownElementContent>
            <Button className={styles.dropDownElement}>
              <Pencil size={16} />
              Change Password
            </Button>
            <Separator />
            <Button className={`${styles.dropDownElement} ${styles.logout}`}>
              <LogOut size={16} />
              Log Out
            </Button>
          </DropDownElementContent>
        </DropDownElement>
      </header>
    </div>
  );
}
