import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { getUserById } from '../services/usersService';
import { appConfig } from '../configuration/appConfig';
import { Request } from 'express';
import { jwtEncryptionAlgorithm } from 'constants/jwt-encryption-algorithm';

const options: StrategyOptions = {
  jwtFromRequest: (req: Request) => {
    let token = null;
    if (req.cookies) {
      token = req.cookies[appConfig.jwtToken.cookieName];
    }
    return token;
  },
  secretOrKey: appConfig.jwtToken.secret,
  issuer: appConfig.serverUrl,
  audience: appConfig.clientUrl,
  algorithms: [jwtEncryptionAlgorithm],
};

passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await getUserById(payload.sub);

      return user
        ? done(null, {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          })
        : done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }),
);
