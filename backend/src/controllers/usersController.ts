import { Request, Response } from 'express';
import { createUser, getUserById, updateUser } from 'services/usersService';

const fetch = async (req: Request, res: Response) => {
  const result = await getUserById(req.params.id);

  res.json(result);
};
const create = async (req: Request, res: Response) => {
  const result = await createUser(req.body);
  res.json(result);
};
const update = async (req: Request, res: Response) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
};

export { fetch, create, update };
