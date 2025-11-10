import styles from './LinkDetailsSkeleton.module.css';
import { TableBody, TableData, TableRow } from '../../shared/Table/Table';

export default function LinkDetailsSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 15 }).map((_, index) => (
        <TableRow key={index}>
          <TableData className={styles.dataContainerSkeleton}>
            <div className={styles.dataSkeleton} />
          </TableData>
          <TableData className={styles.dataContainerSkeleton}>
            <div className={styles.dataSkeleton} />
          </TableData>
          <TableData className={styles.dataContainerSkeleton}>
            <div className={styles.dataSkeleton} />
          </TableData>
          <TableData className={styles.dataContainerSkeleton}>
            <div className={styles.dataSkeleton} />
          </TableData>
          <TableData className={styles.dataContainerSkeleton}>
            <div className={styles.dataSkeleton} />
          </TableData>
        </TableRow>
      ))}
    </TableBody>
  );
}
