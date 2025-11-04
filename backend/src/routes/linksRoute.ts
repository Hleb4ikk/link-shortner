import {
  createLinkHandler,
  deleteLinkHandler,
  getLinksPageHandler,
  getLinkAudienceHandler,
  getLinkHandler,
  updateLinkHandler,
} from 'controllers/linksController';
import express from 'express';
import { authGuard } from 'middlewares/authGuard';
import { permissionLinksControl } from 'middlewares/permissionLinksControl';

const linksRoute = express.Router();

linksRoute.post('/', authGuard, createLinkHandler);
linksRoute.get('/', authGuard, getLinksPageHandler);
linksRoute.get(
  '/:linkId/audience',
  authGuard,
  permissionLinksControl,
  getLinkAudienceHandler,
);
linksRoute.delete(
  '/:linkId',
  authGuard,
  permissionLinksControl,
  deleteLinkHandler,
);
linksRoute.post(
  '/:linkId',
  authGuard,
  permissionLinksControl,
  updateLinkHandler,
);

linksRoute.get('/:linkId', getLinkHandler);

export { linksRoute };
