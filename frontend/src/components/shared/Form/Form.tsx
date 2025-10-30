import styles from './Form.module.css';

import { createContext, FormHTMLAttributes, useContext } from 'react';
import PrimaryButton from '../Button/PrimaryButton';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
  formState?: FormContextType;
}

type FormContextType = { isLoading: boolean } | undefined;

const FormContext = createContext<FormContextType>({ isLoading: false });

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

function FormProvider({
  children,
  formState = { isLoading: false },
}: {
  children: React.ReactNode;
  formState: FormContextType;
}) {
  return (
    <FormContext.Provider value={formState}>{children}</FormContext.Provider>
  );
}

function Form({ className, formState, ...props }: FormProps) {
  return (
    <FormProvider formState={formState}>
      <form className={`${styles.form} ${className}`} {...props}></form>
    </FormProvider>
  );
}

const FormItem = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.formItem} ${className}`}>{children}</div>;
};

const SubmitFormButton = ({
  children,
  loader,
}: {
  children: React.ReactNode;
  loader?: React.ReactNode;
}) => {
  const { isLoading } = useFormContext();

  return (
    <PrimaryButton
      className={`${styles.submitButton} ${isLoading ? styles.loadingSubmitButton : ''}`}
      disabled={isLoading}
    >
      {children}
      {isLoading && loader}
    </PrimaryButton>
  );
};
export { Form, FormItem, SubmitFormButton };
