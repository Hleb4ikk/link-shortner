import styles from './Separator.module.css';

const Separator = ({ className }: { className?: string }) => {
  return <hr className={`${styles.separator} ${className}`} />;
};

export default Separator;
