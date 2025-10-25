import { AuthApiResponseData } from '../auth/types';
import { User } from './UserProvider';

export const getMe = async () => {
  let response;

  try {
    response = await fetch('http://localhost:8080/users/me', {
      credentials: 'include',
    });
  } catch {
    return null;
  }

  const data: AuthApiResponseData = await response.json();

  if ('statusCode' in data) {
    return null;
  }

  return data as User;
};
