import styles from './CreateLinkForm.module.css';

import { SubmitHandler, useForm } from 'react-hook-form';

import Label from '../../../shared/Label/Label';
import Input from '../../../shared/Input/Input';
import { Form, FormItem } from '../../../shared/Form/Form';
import { FormProps } from 'react-router-dom';
import PrimaryButton from '../../../shared/Button/PrimaryButton';

import { zodResolver } from '@hookform/resolvers/zod';

import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { Message, MessageContent } from '../../../shared/Message/Message';
import { createLinkSchema } from '../validation/createLinkSchema';
import { ApiData } from '../../../../types/ApiData';
import { CreateLinkResponse } from '../types/LinksResponse';
import { createLink } from '../api';

type FormFields = {
  title?: string;
  originalLink: string;
};

export default function CreateLinkForm({ className, ...props }: FormProps) {
  const [messageData, setMessageData] =
    useState<ApiData<CreateLinkResponse> | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(createLinkSchema),
  });

  useEffect(() => {
    if (messageData?.successFetch && !('statusCode' in messageData.fetchData)) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [messageData]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setIsLoading(true);
    setMessageData(await createLink(data.originalLink, data.title));
    setIsLoading(false);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      formState={{ isLoading: isLoading }}
      className={`${styles.authForm} ${className} `}
      {...props}
    >
      <FormItem>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          className={styles.formField}
          placeholder="My Campaign Link"
          {...register('title')}
        />
        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
      </FormItem>
      <FormItem>
        <Label htmlFor="originalLink">Original Link</Label>
        <Input
          id="originalLink"
          className={styles.formField}
          placeholder="https://example.com/long-url"
          {...register('originalLink')}
        />
        {errors.originalLink && (
          <p className={styles.error}>{errors.originalLink.message}</p>
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
            <MessageContent>
              Link {messageData.fetchData.shortLinkId} was created.
            </MessageContent>
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
        Create Link
        {isLoading && <Loader className={styles.loader} />}
      </PrimaryButton>
    </Form>
  );
}
