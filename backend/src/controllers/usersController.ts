import { Request, Response } from 'express';

const getMyProfileHandler = async (req: Request, res: Response) => {
  res.json(req.user);
};

export { getMyProfileHandler };
