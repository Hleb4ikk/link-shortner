import { appConfig } from 'configuration/appConfig';
import { Request, Response } from 'express';
import { changePassword, login, register } from 'services/authService';

const registerHandler = async (req: Request, res: Response) => {
  const token = await register(req.body);

  res.cookie(appConfig.jwtToken.cookieName, token, appConfig.cookie);

  res.status(201).json({ message: 'User registered successfully' });
};

const loginHandler = async (req: Request, res: Response) => {
  const token = await login(req.body);

  res.cookie(appConfig.jwtToken.cookieName, token, appConfig.cookie);
  res.status(200).json({ message: 'User logged in successfully' });
};

const logoutHandler = async (req: Request, res: Response) => {
  res.cookie(appConfig.jwtToken.cookieName, '', { maxAge: 0 });
  res.status(200).json({ message: 'User logged out in successfully' });
};

const changePasswordHandler = async (req: Request, res: Response) => {
  await changePassword((req.user as { id: string }).id, req.body);
  res.status(200).json({ message: 'Password changed successfully' });
};

export { registerHandler, loginHandler, logoutHandler, changePasswordHandler };
