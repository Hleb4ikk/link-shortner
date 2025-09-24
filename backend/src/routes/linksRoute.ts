import {
  createLinkHandler,
  getAllUserLinksHandler,
  getLinkHandler,
} from 'controllers/linksController';
import express from 'express';
import { authGuard } from 'middlewares/authGuard';

const linksRoute = express.Router();

linksRoute.post('/links', authGuard, createLinkHandler);
linksRoute.get('/links', authGuard, getAllUserLinksHandler);
linksRoute.get('/:linkId', getLinkHandler);

export { linksRoute };
