import { AuthApiData, AuthApiResponseData } from './types';

const login = async (email: string, password: string): Promise<AuthApiData> => {
  let response;

  try {
    response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    });
  } catch {
    return { successFetch: false, message: 'Failed to login.' };
  }

  const data: AuthApiResponseData = await response.json();

  return { successFetch: true, data };
};

const register = async (
  email: string,
  password: string,
): Promise<AuthApiData> => {
  let response;

  try {
    response = await fetch('http://localhost:8080/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include',
    });
  } catch {
    return { successFetch: false, message: 'Failed to register.' };
  }

  const data: AuthApiResponseData = await response.json();

  return { successFetch: true, data };
};

const logout = async (): Promise<AuthApiData> => {
  let response;
  try {
    response = await fetch('http://localhost:8080/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
  } catch {
    return { successFetch: false, message: 'Failed to log out.' };
  }
  const data: AuthApiResponseData = await response.json();

  return { successFetch: true, data };
};

const changePassword = async (
  oldPassword: string,
  newPassword: string,
): Promise<AuthApiData> => {
  let response;
  try {
    response = await fetch('http://localhost:8080/auth/password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    });
  } catch {
    return { successFetch: false, message: 'Failed to change password' };
  }
  const data: AuthApiResponseData = await response.json();

  return { successFetch: true, data };
};

export { login, register, logout, changePassword };
