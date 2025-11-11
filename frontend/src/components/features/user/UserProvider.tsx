import { createContext, useContext, useEffect, useState } from 'react';
import { User } from './user';

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default function UserProvider({
  children,
  initialValue,
  isLoading,
}: {
  children: React.ReactNode;
  initialValue: User | null;
  isLoading: boolean;
}) {
  const [user, setUser] = useState<User | null>(initialValue);
  const [loading, setLoading] = useState<boolean>(isLoading);

  useEffect(() => {
    setUser(initialValue);
  }, [initialValue]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading: loading }}>
      {children}
    </UserContext.Provider>
  );
}
