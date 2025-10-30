import styles from './ChangePasswordAlert.module.css';

import { Pencil } from 'lucide-react';
import {
  AlertContent,
  AlertHeader,
  AlertRoot,
} from '../../../shared/Alert/Alert';
import Button from '../../../shared/Button/Button';
import ChangePasswordForm from '../ChangePasswordForm/ChangePasswordForm';

export default function ChangePasswordAlert() {
  return (
    <AlertRoot
      alertTrigger={
        <Button className={styles.dropDownElement}>
          <Pencil size={16} />
          Change Password
        </Button>
      }
    >
      <AlertHeader>
        <h1 className={styles.formHeader}>Change password</h1>
        <p className={styles.formDescription}>
          Change password is the best way of guard.
        </p>
      </AlertHeader>
      <AlertContent>
        <ChangePasswordForm />
      </AlertContent>
    </AlertRoot>
  );
}
