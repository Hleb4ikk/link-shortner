import { fetch, create, update } from 'controllers/usersController';
import express from 'express';

const usersRoute = express.Router();

usersRoute.get('/:id', fetch);
usersRoute.post('/', create);
usersRoute.patch('/:id', update);

export { usersRoute };
