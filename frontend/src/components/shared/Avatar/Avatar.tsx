import styles from './Avatar.module.css';

export default function Avatar({ accountName }: { accountName: string }) {
  return <div className={styles.avatar}>{accountName[0].toUpperCase()}</div>;
}
