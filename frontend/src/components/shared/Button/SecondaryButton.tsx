import styles from './SecondaryButton.module.css';

import Button, { ButtonProps } from './Button';

export default function SecondaryButton({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <Button className={`${styles.secondaryButton} ${className}`} {...props}>
      {children}
    </Button>
  );
}
