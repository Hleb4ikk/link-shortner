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
import { Tabs, TabsList, TabsTrigger } from '../../../shared/Tabs/Tabs';

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
  const variant = tab === 'login' ? 'Log In' : 'Sign Up';

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
        onClick={() => handleOpen('register')}
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

        <AlertContent className={styles.alertContent}>
          <Tabs
            onChange={(value: string) => {
              setTab(value as AuthType);
            }}
            defaultValue={tab}
          >
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </Tabs>
          <AuthForm authType={tab} />
        </AlertContent>
      </AlertRoot>
    </>
  );
}
