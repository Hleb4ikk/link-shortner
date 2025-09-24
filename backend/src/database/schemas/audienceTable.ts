import * as p from 'drizzle-orm/pg-core';
import { linksTable } from './linksTable';

export const statisticsTable = p.pgTable('audience', {
  id: p.uuid('ud').primaryKey().defaultRandom(),
  linkId: p
    .uuid('link_id')
    .notNull()
    .references(() => linksTable.id, { onDelete: 'cascade' }),
  ip: p.varchar('ip', { length: 15 }).notNull(),
  region: p.varchar('region', { length: 255 }).notNull(),
  browser: p.varchar('browser', { length: 255 }).notNull(),
  os: p.varchar('os', { length: 255 }).notNull(),
  followedAt: p.timestamp('followed_at').defaultNow().notNull(),
});
