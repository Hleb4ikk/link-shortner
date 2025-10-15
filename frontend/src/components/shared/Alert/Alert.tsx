import styles from './Alert.module.css';

import { cloneElement, isValidElement, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { X } from 'lucide-react';

type AlertTriggerProps = {
  children: React.ReactNode;
  onClick: () => void;
  asChild?: boolean;
};

const AlertTrigger = ({
  children,
  asChild = false,
  ...props
}: AlertTriggerProps) => {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...(children.props ?? {}),
      ...props,
    });
  }

  return <Button className={styles.triggerButton}>{children}</Button>;
};

const Overlay = ({
  children,
  className,
  closeCallback,
}: {
  children: React.ReactNode;
  closeCallback: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={(event) => {
        if (event.currentTarget === event.target) {
          closeCallback();
        }
      }}
      className={`${styles.overlay} ${className}`}
    >
      {children}
    </div>
  );
};

const AlertRoot = ({
  children,
  alertTrigger,
  className,
}: {
  children: React.ReactNode;
  alertTrigger: React.ReactNode;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    function onEscapeDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', onEscapeDown);
    } else {
      document.removeEventListener('keydown', onEscapeDown);
    }
  }, [isOpen]);

  return (
    <>
      <AlertTrigger onClick={() => setIsOpen(true)} asChild>
        {alertTrigger}
      </AlertTrigger>
      {isOpen && (
        <Overlay closeCallback={() => setIsOpen(false)} className={className}>
          <Alert closeCallback={() => setIsOpen(false)}> {children}</Alert>
        </Overlay>
      )}
    </>
  );
};

const Alert = ({
  children,
  closeCallback,
}: {
  children: React.ReactNode;
  closeCallback: () => void;
}) => {
  return (
    <div className={styles.alert}>
      <CloseAlertButton closeCallback={closeCallback} />
      {children}
    </div>
  );
};

const AlertHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.alertHeader} ${className}`}>{children}</div>;
};

const AlertContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`${styles.alertContent} ${className}`}>{children}</div>
  );
};

const AlertFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={`${styles.alertFooter} ${className}`}>{children}</div>;
};

const CloseAlertButton = ({ closeCallback }: { closeCallback: () => void }) => {
  return (
    <Button onClick={closeCallback} className={styles.closeButton}>
      <X />
    </Button>
  );
};

export {
  AlertRoot,
  AlertTrigger,
  AlertHeader,
  AlertContent,
  AlertFooter,
  CloseAlertButton,
};
