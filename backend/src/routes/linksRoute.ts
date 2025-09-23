import { createLinkHandler, getLinkHandler } from 'controllers/linksController';
import express from 'express';
import { authGuard } from 'middlewares/authGuard';

const linksRoute = express.Router();

linksRoute.get('/:linkId', getLinkHandler);
linksRoute.post('/', authGuard, createLinkHandler);

export { linksRoute };
