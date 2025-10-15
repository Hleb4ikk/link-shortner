import styles from './Card.module.css';

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <article className={`${styles.card} ${className}`}>{children}</article>
  );
};
const CardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={`${styles.CardHeader} ${className}`}>{children}</h1>;
};
const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.cardContent} ${className}`}>{children}</div>;
};
const CardFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.cardFooter} ${className}`}>{children}</div>;
};
export { Card, CardHeader, CardContent, CardFooter };
