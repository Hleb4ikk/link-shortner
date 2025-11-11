import styles from './PrimaryButton.module.css';

import Button, { ButtonProps } from './Button';

export default function PrimaryButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button className={`${styles.primaryButton} ${className}`} {...props}>
      {children}
    </Button>
  );
}
