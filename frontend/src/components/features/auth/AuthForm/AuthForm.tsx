import styles from './AuthForm.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthApiResponseData, AuthType } from '../types';
import Label from '../../../shared/Label/Label';
import Input from '../../../shared/Input/Input';
import Form from '../../../shared/Form/Form';
import { FormProps } from 'react-router-dom';
import PrimaryButton from '../../../shared/Button/PrimaryButton';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/loginSchema';
import { registerSchema } from '../validation/registerSchema';
import { login, register as registerUser } from '../api';
import { useEffect, useState } from 'react';

interface AuthFormProps extends FormProps {
  authType: AuthType;
}
type FormFields = {
  email: string;
  password: string;
};
export default function AuthForm({
  authType,
  className,
  ...props
}: AuthFormProps) {
  const [messageData, setMessageData] = useState<AuthApiResponseData | null>(
    null,
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormFields>({
    resolver: zodResolver(authType === 'login' ? loginSchema : registerSchema),
  });
  useEffect(() => {
    if (isSubmitting) {
      setMessageData(null);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isSubmitted) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isSubmitted]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (authType === 'login') {
      setMessageData(await login(data.email, data.password));
    } else {
      setMessageData(await registerUser(data.email, data.password));
    }
  };

  const buttonVariant = authType === 'login' ? 'Sign In' : 'Create Account';

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      className={`${styles.authForm} ${className} `}
      {...props}
    >
      <div className={styles.formItem}>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          className={styles.formField}
          placeholder="you@example.com"
          {...register('email')}
        />
        {errors.email && (
          <p className={styles.error}>{errors.email?.message}</p>
        )}
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
        {errors.password && (
          <p className={styles.error}>{errors.password?.message}</p>
        )}
      </div>
      <div className={styles.submitResult}>
        {messageData &&
          ('statusCode' in messageData
            ? messageData.description
            : messageData.message)}
      </div>
      <PrimaryButton className={styles.submitButton}>
        {buttonVariant}
      </PrimaryButton>
    </Form>
  );
}
