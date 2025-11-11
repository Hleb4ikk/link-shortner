import styles from './Table.module.css';

function Table({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <table className={`${styles.table} ${className}`}>{children}</table>;
}
function TableHead({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <thead className={`${styles.head} ${className}`}>{children}</thead>;
}
function TableBody({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <tbody className={`${styles.tableBody} ${className}`}>{children}</tbody>
  );
}
function TableHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <th className={`${styles.tableHeader} ${className}`}>{children}</th>;
}
function TableRow({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <tr className={`${styles.tableRow} ${className}`}>{children}</tr>;
}
function TableData({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return <td className={`${styles.tableData} ${className}`}>{children}</td>;
}

export { Table, TableHead, TableBody, TableRow, TableData, TableHeader };
