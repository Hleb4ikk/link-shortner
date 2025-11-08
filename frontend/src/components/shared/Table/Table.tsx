import styles from './Table.module.css';

function Table({ children }: { children: React.ReactNode }) {
  return <table className={styles.table}>{children}</table>;
}
function TableHead({ children }: { children: React.ReactNode }) {
  return <thead className={styles.head}>{children}</thead>;
}
function TableBody({ children }: { children: React.ReactNode }) {
  return <tbody className={styles.tableBody}>{children}</tbody>;
}
function TableHeader({ children }: { children: React.ReactNode }) {
  return <th className={styles.tableHeader}>{children}</th>;
}
function TableRow({ children }: { children: React.ReactNode }) {
  return <tr className={styles.tableRow}>{children}</tr>;
}
function TableData({ children }: { children: React.ReactNode }) {
  return <td className={styles.tableData}>{children}</td>;
}

export { Table, TableHead, TableBody, TableRow, TableData, TableHeader };
