import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import styles from './Tabs.module.css';

interface TabsContextValue {
  value: string;
  setValue: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  onChange: (value: string) => void;
  className?: string;
}

export const Tabs = ({
  defaultValue,
  children,
  className,
  onChange,
}: TabsProps) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={`${styles.tabs} ${className || ''}`}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
}

export const TabsList = ({ children }: TabsListProps) => {
  return <div className={styles.tabsList}>{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
}

export const TabsTrigger = ({ value, children }: TabsTriggerProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used inside Tabs');

  const { value: selectedValue, setValue } = context;
  const isActive = selectedValue === value;

  return (
    <button
      onClick={() => setValue(value)}
      className={`${styles.tabsTrigger} ${isActive ? styles.tabsTriggerActive : ''}`}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
}

export const TabsContent = ({ value, children }: TabsContentProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used inside Tabs');

  const { value: selectedValue } = context;

  if (selectedValue !== value) return null;

  return <div className={styles.tabsContent}>{children}</div>;
};
