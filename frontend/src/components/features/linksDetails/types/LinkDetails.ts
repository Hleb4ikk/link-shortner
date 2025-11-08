import { Link } from '../../links/types/Link';
import { Audience } from './Audience';

export type LinkDetails = {
  totalPages: number;
  audience: Audience[];
  link: Omit<Link, 'id' | 'audienceCount'>;
};
