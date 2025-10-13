import { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
}

const Input = ({ className, placeholder, ...props }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      type="text"
      {...props}
    />
  );
};

export default Input;
