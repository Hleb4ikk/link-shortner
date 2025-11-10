import { slugName } from 'constants/links-constants';
import { Request, Response } from 'express';
import { createAudience, getAudienceByLinkId } from 'services/audienceService';
import {
  createLink,
  deleteLink,
  getLinksPage,
  getLinkByShortId,
  updateLink,
} from 'services/linksService';
import { HttpStatus } from 'types/HttpStatus';
import extractIpFromRequestHeaders from 'utils/extractIpFromRequestHeaders';

const getLinkAudiencePageHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];

  const audience = await getAudienceByLinkId(shortId, {
    page: req.query.page,
    limit: req.query.limit,
  });

  res.status(HttpStatus.OK).json(audience);
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

const getLinksPageHandler = async (req: Request, res: Response) => {
  const links = await getLinksPage((req.user as { id: string }).id, {
    page: req.query.page,
    limit: req.query.limit,
    searchQuery: req.query.search,
  });
  res.status(HttpStatus.OK).json(links);
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
  getLinksPageHandler,
  getLinkAudiencePageHandler,
  deleteLinkHandler,
  updateLinkHandler,
};
