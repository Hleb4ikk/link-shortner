import styles from './AuthForm.module.css';

import { useForm } from 'react-hook-form';

import { AuthType } from '../types';
import Label from '../../../shared/Label/Label';
import Input from '../../../shared/Input/Input';
import Form from '../../../shared/Form/Form';
import { FormProps } from 'react-router-dom';
import PrimaryButton from '../../../shared/Button/PrimaryButton';

interface AuthFormProps extends FormProps {
  authType: AuthType;
}

export default function AuthForm({
  authType,
  className,
  ...props
}: AuthFormProps) {
  const { register } = useForm();

  const buttonVariant = authType === 'login' ? 'Sign In' : 'Create Account';

  return (
    <Form className={`${styles.authForm} ${className} `} {...props}>
      <div className={styles.formItem}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          className={styles.formField}
          placeholder="you@example.com"
          {...register('email')}
        />
      </div>
      <div className={styles.formItem}>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          className={styles.formField}
          placeholder="Please enter password..."
          {...register('password')}
        />
      </div>
      <PrimaryButton className={styles.submitButton}>
        {buttonVariant}
      </PrimaryButton>
    </Form>
  );
}
