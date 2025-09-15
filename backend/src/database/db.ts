import { appConfig } from 'configuration/appConfig';
import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle(appConfig.dbUrl);
