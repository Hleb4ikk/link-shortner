import dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
  appPort: Number(process.env.APP_PORT!),
  serverUrl: `http://${process.env.APP_HOST!}:${process.env.APP_PORT!}`,
  clientUrl: `http://${process.env.CLIENT_HOST!}:${Number(process.env.CLIENT_PORT!)}`,
  dbUrl: process.env.DATABASE_URL!,
  jwtToken: {
    secret: process.env.JWT_SECRET!,
    cookieName: process.env.JWT_COOKIE_NAME!,
    expiresIn: Number(process.env.JWT_EXPIRES_IN!),
  },
  cookie: {
    httpOnly: process.env.COOKIE_HTTP_ONLY! === 'true',
    secure: process.env.COOKIE_SECURE! === 'true',
    maxAge: Number(process.env.COOKIE_MAX_AGE!),
    sameSite: process.env.COOKIE_SAME_SITE! as
      | boolean
      | 'lax'
      | 'strict'
      | 'none'
      | undefined,
    path: process.env.COOKIE_PATH!,
  },
};
