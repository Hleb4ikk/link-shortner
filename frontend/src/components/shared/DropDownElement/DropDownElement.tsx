import styles from './DropDownElement.module.css';
import Button from '../Button/Button';
import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from 'react';

const DropDownElement = ({
  children,
  trigger,
  defaultOpen = false,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleClose(event: MouseEvent) {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener('click', handleClose);
    }

    return () => {
      document.body.removeEventListener('click', handleClose);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className={styles.container}>
      <DropDownElementTrigger
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {trigger}
      </DropDownElementTrigger>
      {isOpen && children}
    </div>
  );
};

const DropDownElementContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className={styles.content}>{children}</div>;
};

interface DropDownElementTriggerProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: () => void;
  asChild?: boolean;
}

const DropDownElementTrigger = ({
  children,
  asChild = false,
  ...props
}: DropDownElementTriggerProps) => {
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ...(children.props ?? {}),
      ...props,
    });
  }

  return (
    <Button className={styles.triggerButton} {...props}>
      {children}
    </Button>
  );
};

export { DropDownElement, DropDownElementTrigger, DropDownElementContent };
