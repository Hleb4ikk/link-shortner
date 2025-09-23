import { slugName } from 'constants/links-constants';
import { Request, Response } from 'express';
import { createLink, getLinkByShortId } from 'services/linksService';

const getLinkHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];

  const link = await getLinkByShortId(shortId);

  res.redirect(link.url);
};

const createLinkHandler = async (req: Request, res: Response) => {
  const shortId = await createLink(req.body, (req.user as { id: string }).id);
  res.status(201).json({ status: 201, message: 'Link created', shortId });
};

export { getLinkHandler, createLinkHandler };
