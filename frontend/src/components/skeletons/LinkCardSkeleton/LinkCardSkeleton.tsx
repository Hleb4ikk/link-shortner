import styles from './LinkCardSkeleton.module.css';

export default function LinkCardSkeleton() {
  return (
    <div className={styles.linkCard}>
      <div className={styles.linkHeader}></div>
      <div className={styles.shortLink}></div>
      <div className={styles.originalLink}></div>
      <div className={styles.actions}>
        <div className={styles.actionButton}></div>
        <div className={styles.actionButton}></div>
        <div className={styles.actionButton}></div>
      </div>
    </div>
  );
}
