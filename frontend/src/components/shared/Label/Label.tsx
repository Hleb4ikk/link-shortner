import { LabelHTMLAttributes } from 'react';
import styles from './Label.module.css';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function ({ children, className, ...props }: LabelProps) {
  return (
    <label className={`${styles.label} ${className}`} {...props}>
      {children}
    </label>
  );
}
