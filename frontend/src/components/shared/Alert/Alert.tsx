import styles from './Alert.module.css';

import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import Button from '../Button/Button';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

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
type AlertRootProps =
  | {
      children: React.ReactNode;
      alertTrigger: React.ReactNode;
      handleClose?: null;
      open?: null;
      className?: string;
    }
  | {
      children: React.ReactNode;
      alertTrigger?: null;
      handleClose: () => void;
      open: boolean;
      className?: string;
    };

const AlertRoot = ({
  children,
  alertTrigger,
  handleClose,
  open = false,
  className,
}: AlertRootProps) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    function onEscapeDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (handleClose) {
          handleClose();
        }
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', onEscapeDown);
    } else {
      document.removeEventListener('keydown', onEscapeDown);
      if (handleClose) {
        handleClose();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return (
    <>
      {alertTrigger && (
        <AlertTrigger onClick={() => setIsOpen(true)} asChild>
          {alertTrigger}
        </AlertTrigger>
      )}
      {isOpen &&
        createPortal(
          <Overlay closeCallback={() => setIsOpen(false)} className={className}>
            <Alert closeCallback={() => setIsOpen(false)}>{children}</Alert>
          </Overlay>,
          document.body,
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
