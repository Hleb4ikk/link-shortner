import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  appPort: Number(process.env.APP_PORT!),
  dbUrl: process.env.DATABASE_URL!,
};
