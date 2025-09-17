import {
  getMyProfileHandler,
  updateUserHandler,
} from 'controllers/usersController';
import express from 'express';

const usersRoute = express.Router();

usersRoute.get('/me', getMyProfileHandler);
usersRoute.patch('/:id', updateUserHandler);

export { usersRoute };
