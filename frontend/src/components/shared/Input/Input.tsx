import styles from './Input.module.css';

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string;
  placeholder?: string;
}

const Input = ({ className, ref, placeholder, ...props }: InputProps) => {
  return (
    <input
      placeholder={placeholder}
      className={`${styles.input} ${className}`}
      ref={ref}
      type="text"
      {...props}
    />
  );
};

export default Input;
