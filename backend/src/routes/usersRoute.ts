import { getMyProfileHandler } from 'controllers/usersController';
import express from 'express';

const usersRoute = express.Router();

usersRoute.get('/me', getMyProfileHandler);

export { usersRoute };
