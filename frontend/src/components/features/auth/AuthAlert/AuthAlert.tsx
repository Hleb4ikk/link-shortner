import styles from './AuthAlert.module.css';

import { useState } from 'react';
import {
  AlertRoot,
  AlertHeader,
  AlertContent,
} from '../../../shared/Alert/Alert';
import Button from '../../../shared/Button/Button';

import PrimaryButton from '../../../shared/Button/PrimaryButton';
import { AuthType } from '../types';
import AuthForm from '../AuthForm/AuthForm';

export default function AuthAlert() {
  const [tab, setTab] = useState<AuthType>('login');

  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }
  function handleOpen(tab: AuthType) {
    setTab(tab);
    setOpen(true);
  }
  const variant = tab === 'signup' ? 'Sign Up' : 'Log In';

  return (
    <>
      <Button
        onClick={() => {
          handleOpen('login');
        }}
      >
        Login
      </Button>
      <PrimaryButton
        onClick={() => handleOpen('signup')}
        className={styles.signUpButton}
      >
        Sign Up
      </PrimaryButton>
      <AlertRoot handleClose={handleClose} open={open}>
        <AlertHeader>
          <h1 className={styles.formHeader}>{variant}</h1>
          <p className={styles.formDescription}>
            {tab === 'login'
              ? 'Enter your credentials to access your account.'
              : 'Create a new account to get started.'}
          </p>
        </AlertHeader>

        <AlertContent>
          <AuthForm authType={tab} />
        </AlertContent>
      </AlertRoot>
    </>
  );
}
