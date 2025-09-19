import {
  changePasswordHandler,
  loginHandler,
  logoutHandler,
  registerHandler,
} from 'controllers/authController';
import express from 'express';
import { authGuard } from 'middlewares/authGuard';

const authRoute = express.Router();

authRoute.post('/register', registerHandler);
authRoute.post('/login', loginHandler);
authRoute.post('/logout', logoutHandler);
authRoute.post('/password', authGuard, changePasswordHandler);

export { authRoute };
