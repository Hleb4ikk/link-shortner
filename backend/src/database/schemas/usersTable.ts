import * as p from 'drizzle-orm/pg-core';

export const usersTable = p.pgTable('users', {
  id: p.uuid('id').primaryKey().defaultRandom(),
  name: p.varchar('name', { length: 255 }),
  email: p.varchar('email', { length: 255 }).notNull(),
  hashedPassword: p.varchar('hashed_password', { length: 255 }).notNull(),
  createdAt: p.timestamp('created_at').defaultNow().notNull(),
  updatedAt: p.timestamp('updated_at').defaultNow().notNull(),
});
