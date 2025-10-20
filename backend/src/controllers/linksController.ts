import { slugName } from 'constants/links-constants';
import { Request, Response } from 'express';
import { createAudience, getAudienceByLinkId } from 'services/audienceService';
import {
  createLink,
  deleteLink,
  getAllUserLinks,
  getLinkByShortId,
  updateLink,
} from 'services/linksService';
import { HttpStatus } from 'types/HttpStatus';
import extractIpFromRequestHeaders from 'utils/extractIpFromRequestHeaders';

const getLinkAudienceHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];

  const audience = await getAudienceByLinkId(shortId);

  res.status(HttpStatus.OK).json({ audience });
};

const getLinkHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];
  const link = await getLinkByShortId(shortId);

  await createAudience({
    shortLinkId: link.shortLinkId,
    ip: extractIpFromRequestHeaders(req),
    userAgent: req.headers['user-agent'],
  });

  res.redirect(link.url);
};

const createLinkHandler = async (req: Request, res: Response) => {
  const shortId = await createLink(req.body, (req.user as { id: string }).id);
  res.status(HttpStatus.CREATED).json({ shortId });
};

const getAllUserLinksHandler = async (req: Request, res: Response) => {
  const links = await getAllUserLinks((req.user as { id: string }).id);
  res.status(HttpStatus.OK).json({ links });
};

const deleteLinkHandler = async (req: Request, res: Response) => {
  const deletedLink = await deleteLink(req.params[slugName]);
  res.status(HttpStatus.OK).json(deletedLink);
};

const updateLinkHandler = async (req: Request, res: Response) => {
  const updatedLink = await updateLink(req.params[slugName], req.body);
  res.status(HttpStatus.OK).json(updatedLink);
};

export {
  getLinkHandler,
  createLinkHandler,
  getAllUserLinksHandler,
  getLinkAudienceHandler,
  deleteLinkHandler,
  updateLinkHandler,
};
