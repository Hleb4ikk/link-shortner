import styles from './Form.module.css';

import { FormHTMLAttributes } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  className?: string;
}

export default function Form({ className, ...props }: FormProps) {
  return <form className={`${styles.form} ${className}`} {...props}></form>;
}
