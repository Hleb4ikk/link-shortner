import {
  createLinkHandler,
  getAllUserLinksHandler,
  getLinkHandler,
} from 'controllers/linksController';
import express from 'express';
import { authGuard } from 'middlewares/authGuard';

const linksRoute = express.Router();

linksRoute.post('/', authGuard, createLinkHandler);
linksRoute.get('/', authGuard, getAllUserLinksHandler);
linksRoute.get('/:linkId', getLinkHandler);

export { linksRoute };
