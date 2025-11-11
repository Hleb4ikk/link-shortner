import { appConfig } from '../../../configuration/appConfig';
import { User } from './user';

export const getMe = async () => {
  const response = await fetch(`${appConfig.serverUrl}/users/me`, {
    credentials: 'include',
  });

  const data = await response.json();

  return data as User;
};
