import styles from './ChangePasswordForm.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormItem,
  FormProps,
  SubmitFormButton,
} from '../../../shared/Form/Form';
import Input from '../../../shared/Input/Input';
import Label from '../../../shared/Label/Label';
import { Message, MessageContent } from '../../../shared/Message/Message';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../validation/changePasswordSchema';
import { changePassword } from '../api';
import { ApiData } from '../../../../types/ApiData';
import { AuthApiResponseData } from '../types';

type FormFields = {
  oldPassword: string;
  newPassword: string;
};

export default function ChangePasswordForm({
  className,
  ...props
}: Omit<FormProps, 'formState'>) {
  const [messageData, setMessageData] =
    useState<ApiData<AuthApiResponseData> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async ({
    oldPassword,
    newPassword,
  }) => {
    setIsLoading(true);
    setMessageData(await changePassword(oldPassword, newPassword));
    setIsLoading(false);
  };

  useEffect(() => {
    if (messageData?.successFetch && !('statusCode' in messageData.fetchData)) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [messageData]);

  return (
    <Form
      formState={{ isLoading }}
      onSubmit={handleSubmit(onSubmit)}
      className={className}
      {...props}
    >
      <FormItem>
        <Label htmlFor="oldPassword">Old password</Label>
        <Input
          id="oldPassword"
          type="password"
          className={styles.formField}
          placeholder="Please enter old password..."
          {...register('oldPassword')}
        />
        {errors.oldPassword && (
          <p className={styles.error}>{errors.oldPassword?.message}</p>
        )}
      </FormItem>
      <FormItem>
        <Label htmlFor="newPassword">New password</Label>
        <Input
          id="newPassword"
          type="password"
          className={styles.formField}
          placeholder="Please enter new password..."
          {...register('newPassword')}
        />
        {errors.newPassword && (
          <p className={styles.error}>{errors.newPassword?.message}</p>
        )}
      </FormItem>
      {messageData?.successFetch &&
        ('statusCode' in messageData.fetchData ? (
          <Message className={styles.failedSubmitResult}>
            <MessageContent>
              {messageData.fetchData.description ||
                messageData.fetchData.message}
            </MessageContent>
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
      <SubmitFormButton loader={<Loader className={styles.loader} />}>
        Submit
      </SubmitFormButton>
    </Form>
  );
}
