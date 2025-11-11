import styles from './Message.module.css';

const Message = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.message} ${className}`}>{children}</div>;
};

const MessageHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${styles.messageHeader} ${className}`}>{children}</div>
  );
};

const MessageContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${styles.messageContent} ${className}`}>{children}</div>
  );
};

export { Message, MessageHeader, MessageContent };
