import { appConfig } from 'configuration/appConfig';
import { Request, Response } from 'express';
import { register } from 'services/authService';

const registerHandler = async (req: Request, res: Response) => {
  const token = await register(req.body);

  res.cookie(appConfig.jwtToken.cookieName, token, appConfig.cookie);

  res
    .status(201)
    .json({ status: 201, message: 'User registered successfully' });
};

// const loginHandler = async (req: Request, res: Response) => {};

// const logoutHandler = async (req: Request, res: Response) => {};

export { registerHandler };
