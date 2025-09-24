import { slugName } from 'constants/links-constants';
import { Request, Response } from 'express';
import {
  createLink,
  getAllUserLinks,
  getLinkByShortId,
} from 'services/linksService';

const getLinkHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];

  const link = await getLinkByShortId(shortId);

  res.redirect(link.url);
};

const createLinkHandler = async (req: Request, res: Response) => {
  const shortId = await createLink(req.body, (req.user as { id: string }).id);
  res.status(201).json({ shortId });
};

const getAllUserLinksHandler = async (req: Request, res: Response) => {
  const links = await getAllUserLinks((req.user as { id: string }).id);
  res.status(200).json({ links });
};

export { getLinkHandler, createLinkHandler, getAllUserLinksHandler };
