import { relations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';
import { linksTable } from './linksTable';

const usersTable = p.pgTable('users', {
  id: p.uuid('id').primaryKey().defaultRandom(),
  email: p.varchar('email', { length: 255 }).notNull().unique(),
  hashedPassword: p.varchar('hashed_password', { length: 255 }).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p.timestamp('updated_at').defaultNow().notNull(),
});

const usersRelations = relations(usersTable, ({ many }) => ({
  links: many(linksTable),
}));

export { usersTable, usersRelations };
