import { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
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
}: {
  children: React.ReactNode;
  initialValue: User | null;
}) {
  const [user, setUser] = useState<User | null>(initialValue);

  useEffect(() => {
    setUser(initialValue);
  }, [initialValue]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
