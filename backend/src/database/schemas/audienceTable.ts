import * as p from 'drizzle-orm/pg-core';
import { linksTable } from './linksTable';

export const audienceTable = p.pgTable('audience', {
  id: p.uuid('id').primaryKey().defaultRandom(),
  shortLinkId: p
    .varchar('short_link_id', { length: 10 })
    .notNull()
    .references(() => linksTable.shortLinkId, { onDelete: 'cascade' }),
  ip: p.varchar('ip', { length: 45 }).notNull(),
  region: p.varchar('region', { length: 255 }).notNull(),
  browser: p.varchar('browser', { length: 255 }).notNull(),
  os: p.varchar('os', { length: 255 }).notNull(),
  followedAt: p.timestamp('followed_at').defaultNow().notNull(),
});
