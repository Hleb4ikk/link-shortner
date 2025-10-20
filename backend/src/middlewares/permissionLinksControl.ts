import { slugName } from 'constants/links-constants';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { getLinkByShortId } from 'services/linksService';
import { ForbiddenException } from 'types/exceptions/HttpExceptions';

export const permissionLinksControl: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const currentUserId = (req.user as { id: string }).id;
  const link = await getLinkByShortId(req.params[slugName]);

  if (!(currentUserId === link.ownerId)) {
    throw new ForbiddenException('You have no access rights to this resource.');
  }
  next();
};
