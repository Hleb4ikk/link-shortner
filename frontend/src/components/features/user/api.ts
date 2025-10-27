import { User } from './UserProvider';

export const getMe = async () => {
  const response = await fetch('http://localhost:8080/users/me', {
    credentials: 'include',
  });

  const data = await response.json();

  return data as User;
};
