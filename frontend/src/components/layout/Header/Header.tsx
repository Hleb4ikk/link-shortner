import {
  NavigationItem,
  NavigationMenu,
} from '../../shared/NavigationMenu/NavigationMenu';
import styles from './Header.module.css';
import Logo from '../../shared/Logo/Logo';
import AuthAlert from '../../features/auth/AuthAlert/AuthAlert';
import Avatar from '../../shared/Avatar/Avatar';
import {
  DropDownElement,
  DropDownElementContent,
} from '../../shared/DropDownElement/DropDownElement';
import Separator from '../../shared/Separator/Separator';
import { useUser } from '../../features/user/UserProvider';
import AvatarSkeleton from '../../skeletons/AvatarSkeleton/AvatarSkeleton';
import LogOutButton from '../../features/auth/LogOutButton/LogOutButton';
import ChangePasswordAlert from '../../features/auth/ChangePasswordAlert/ChangePasswordAlert';
import ThemeSwitcher from '../../shared/ThemeSwitcher/ThemeSwitcher';

const menuItems = [
  {
    text: 'Links',
    path: '/links',
    isPrivateUserItem: true,
  },
];

export default function Header() {
  const { user, isLoading } = useUser();

  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <Logo />

        <div className={styles.usersMenu}>
          <NavigationMenu>
            {menuItems.map((item, index) =>
              item.isPrivateUserItem ? (
                user && (
                  <NavigationItem key={index} to={item.path}>
                    {item.text}
                  </NavigationItem>
                )
              ) : (
                <NavigationItem key={index} to={item.path}>
                  {item.text}
                </NavigationItem>
              ),
            )}
          </NavigationMenu>
          <ThemeSwitcher />

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
