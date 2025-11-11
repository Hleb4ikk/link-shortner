import { appConfig } from './src/configuration/appConfig';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schemas/*.ts',
  out: './drizzle',
  dbCredentials: {
    url: appConfig.dbUrl,
  },
});
