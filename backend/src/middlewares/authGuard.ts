import { RequestHandler } from 'express';
import passport from 'passport';
import { UnauthorizedException } from 'types/exceptions/HttpExceptions';

export const authGuard: RequestHandler = (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: Express.User) => {
      if (err) return next(err);

      if (!user) {
        return next(new UnauthorizedException());
      }

      req.user = user;
      next();
    },
  )(req, res, next);
};
