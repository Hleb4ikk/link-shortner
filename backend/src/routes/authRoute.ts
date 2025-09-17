import { registerHandler } from 'controllers/authController';
import express from 'express';

const authRoute = express.Router();

authRoute.post('/register', registerHandler);
// authRoute.post('/login', loginHandler);

export { authRoute };
