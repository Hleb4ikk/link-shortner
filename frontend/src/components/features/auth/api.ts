import { AuthApiResponseData } from './types';

const login = async (email: string, password: string) => {
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
    return { message: 'Failed to login.' };
  }

  const data: AuthApiResponseData = await response.json();

  return data;
};

const register = async (email: string, password: string) => {
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
    return { message: 'Failed to register.' };
  }

  const data: AuthApiResponseData = await response.json();

  return data;
};

const logout = async () => {
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
    return { message: 'Failed to log out.' };
  }
  const data: AuthApiResponseData = await response.json();

  return data;
};

const changePassword = async (oldPassword: string, newPassword: string) => {
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
    return { messsage: 'Failed to change password' };
  }
  const data: AuthApiResponseData = await response.json();

  return data;
};

export { login, register, logout, changePassword };
