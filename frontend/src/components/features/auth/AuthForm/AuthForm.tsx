import styles from './AuthForm.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import { AuthApiResponseData, AuthType } from '../types';
import Label from '../../../shared/Label/Label';
import Input from '../../../shared/Input/Input';
import { Form, FormItem } from '../../../shared/Form/Form';
import { FormProps } from 'react-router-dom';
import PrimaryButton from '../../../shared/Button/PrimaryButton';

import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/loginSchema';
import { registerSchema } from '../validation/registerSchema';
import { login, register as registerUser } from '../api';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { Message, MessageContent } from '../../../shared/Message/Message';
import { ApiData } from '../../../../types/ApiData';

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
  const [messageData, setMessageData] =
    useState<ApiData<AuthApiResponseData> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormFields>({
    resolver: zodResolver(authType === 'login' ? loginSchema : registerSchema),
  });

  useEffect(() => {
    setMessageData(null);
    reset();
  }, [authType]);

  useEffect(() => {
    if (messageData?.successFetch && !('statusCode' in messageData.fetchData)) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [messageData]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    if (authType === 'login') {
      setMessageData(await login(data.email, data.password));
    } else {
      setMessageData(await registerUser(data.email, data.password));
    }
    setIsLoading(false);
  };

  const buttonVariant = authType === 'login' ? 'Sign In' : 'Create Account';

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      formState={{ isLoading: isLoading }}
      className={`${styles.authForm} ${className} `}
      {...props}
    >
      <FormItem>
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
      </FormItem>
      <FormItem>
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
      </FormItem>
      {messageData?.successFetch &&
        ('statusCode' in messageData.fetchData ? (
          <Message className={styles.failedSubmitResult}>
            <MessageContent>{messageData.fetchData.description}</MessageContent>
          </Message>
        ) : (
          <Message className={styles.successSubmitResult}>
            <MessageContent>{messageData.fetchData.message}</MessageContent>
          </Message>
        ))}
      {messageData && !messageData.successFetch && (
        <Message className={styles.failedSubmitResult}>
          <MessageContent>{messageData.message}</MessageContent>
        </Message>
      )}
      <PrimaryButton
        className={`${styles.submitButton} ${isLoading ? styles.loadingSubmitButton : ''}`}
        disabled={isLoading}
      >
        {buttonVariant}
        {isLoading && <Loader className={styles.loader} />}
      </PrimaryButton>
    </Form>
  );
}
