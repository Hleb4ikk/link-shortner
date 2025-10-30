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
import Separator from '../../shared/Separator/Separator';
import { useUser } from '../../features/user/UserProvider';
import AvatarSkeleton from '../../skeletons/AvatarSkeleton';
import LogOutButton from '../../features/auth/LogOutButton/LogOutButton';
import ChangePasswordAlert from '../../features/auth/ChangePasswordAlert/ChangePasswordAlert';

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
  const { user, isLoading } = useUser();

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Logo />
        <NavigationMenu>
          {menuItems.map((item, index) => (
            <NavigationItem key={index} to={item.path}>
              {item.text}
            </NavigationItem>
          ))}
        </NavigationMenu>
        <div className={styles.usersMenu}>
          <Button className={styles.themeSwitcher}>
            <Sun className={styles.icon} />
          </Button>

          {!user && isLoading && <AvatarSkeleton />}
          {!user && !isLoading && <AuthAlert />}
          {user && !isLoading && (
            <DropDownElement trigger={<Avatar accountName={user.email} />}>
              <DropDownElementContent>
                <ChangePasswordAlert />
                <Separator />
                <LogOutButton className={styles.dropDownElement} />
              </DropDownElementContent>
            </DropDownElement>
          )}
        </div>
      </header>
    </div>
  );
}
