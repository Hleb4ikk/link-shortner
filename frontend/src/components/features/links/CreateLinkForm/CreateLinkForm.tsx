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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../app/storage/storage';
import { createLink } from '../../../../app/storage/slices/linksSlice';

type FormFields = {
  title?: string;
  originalLink: string;
};

export default function CreateLinkForm({ className, ...props }: FormProps) {
  const [isSuccessfulSent, setIsSuccessfulSent] = useState(false);

  const { isCreating, createError } = useSelector(
    (state: RootState) => state.links,
  );

  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(createLinkSchema),
  });

  useEffect(() => {
    if (isSuccessfulSent) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  }, [isSuccessfulSent]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const result = await dispatch(
      createLink({
        originalLink: data.originalLink,
        title: data.title || 'untitled',
      }),
    );
    if (createLink.fulfilled.match(result)) {
      setIsSuccessfulSent(true);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      formState={{ isLoading: isCreating }}
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
      {createError && (
        <Message className={styles.failedSubmitResult}>
          <MessageContent>{createError}</MessageContent>
        </Message>
      )}
      {isSuccessfulSent && (
        <Message className={styles.successSubmitResult}>
          <MessageContent>Link was created.</MessageContent>
        </Message>
      )}
      <PrimaryButton
        className={`${styles.submitButton} ${isCreating ? styles.loadingSubmitButton : ''}`}
        disabled={isCreating}
      >
        Create Link
        {isCreating && <Loader className={styles.loader} />}
      </PrimaryButton>
    </Form>
  );
}
