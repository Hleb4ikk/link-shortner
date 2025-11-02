import { ErrorApiResponseData } from '../../../../types/ErrorApiResponseData';
import { Link } from './Link';

export type CreateLinkResponse =
  | Omit<Link, 'id' | 'title' | 'url' | 'createdAt' | 'audienceCount'>
  | ErrorApiResponseData;

export type GetLinksResponse = { links: Array<Link> } | ErrorApiResponseData;

export type UpdateLinkResponse =
  | Omit<Link, 'id' | 'url' | 'shortLinkId' | 'createdAt' | 'audienceCount'>
  | ErrorApiResponseData;

export type DeleteLinkResponse =
  | Omit<Link, 'title' | 'url' | 'shortLinkId' | 'createdAt' | 'audienceCount'>
  | ErrorApiResponseData;
