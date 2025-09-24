import * as p from 'drizzle-orm/pg-core';
import { usersTable } from './usersTable';

const linksTable = p.pgTable('links', {
  id: p.uuid('id').primaryKey().defaultRandom(),
  ownerId: p
    .uuid('owner_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  shortLinkId: p.varchar('short_link_id', { length: 10 }).unique().notNull(),
  url: p.varchar('url', { length: 255 }).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
});

export { linksTable };
