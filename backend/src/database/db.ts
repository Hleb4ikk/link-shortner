import { appConfig } from 'configuration/appConfig';
import { drizzle } from 'drizzle-orm/node-postgres';
import { logError } from 'logger';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: appConfig.dbUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on('error', (err) => {
  logError('[Postgres Pool Error]', err.message);
});

export const db = drizzle(pool);
