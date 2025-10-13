import styles from './Button.module.css';

import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${styles.button} ${className} `}>
      {children}
    </button>
  );
};

export default Button;
