import { Request, Response } from 'express';
import { updateUser } from 'services/usersService';

const getMyProfileHandler = async (req: Request, res: Response) => {
  res.json(req.user);
};

const updateUserHandler = async (req: Request, res: Response) => {
  const result = await updateUser(req.params.id, req.body);
  res.json(result);
};

export { getMyProfileHandler, updateUserHandler };
