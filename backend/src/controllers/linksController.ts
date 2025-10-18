import { slugName } from 'constants/links-constants';
import { Request, Response } from 'express';
import { createAudience } from 'services/audienceService';
import {
  createLink,
  getAllUserLinks,
  getLinkByShortId,
} from 'services/linksService';

const getLinkHandler = async (req: Request, res: Response) => {
  const shortId = req.params[slugName];
  const link = await getLinkByShortId(shortId);
  console.log('X-Client-IP: ', req.headers['X-Client-IP']);
  console.log('X-Forwarded-For: ', req.headers['X-Forwarded-For']);
  console.log('CF-Connecting-IP: ', req.headers['CF-Connecting-IP']);
  console.log('Fastly-Client-Ip: ', req.headers['Fastly-Client-Ip']);
  console.log('True-Client-Ip: ', req.headers['True-Client-Ip']);
  console.log('X-Real-IP: ', req.headers['X-Real-IP']);
  console.log('X-Cluster-Client-IP: ', req.headers['X-Cluster-Client-IP']);
  console.log('X-Forwarded: ', req.headers['X-Forwarded']);
  console.log('Forwarded-For: ', req.headers['Forwarded-For']);
  console.log('Forwarded: ', req.headers['Forwarded']);
  console.log('appengine-user-ip: ', req.headers['appengine-user-ip']);
  console.log('req.connection.remoteAddress: ', req.connection.remoteAddress);
  console.log('Cf-Pseudo-IPv4: ', req.headers['Cf-Pseudo-IPv4']);
  console.log(req.socket.remoteAddress);

  await createAudience({
    linkId: link.id,
    ip: req.socket.remoteAddress,
    userAgent: req.headers['user-agent'],
  });
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
