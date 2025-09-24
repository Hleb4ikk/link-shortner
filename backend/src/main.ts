import express from 'express';
import { appConfig } from 'configuration/appConfig';
import { usersRoute } from 'routes/usersRoute';
import errorHandler from 'errorHandler';
import { authRoute } from 'routes/authRoute';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authGuard } from 'middlewares/authGuard';
import './strategies/jwt-strategy';
import passport from 'passport';
import { linksRoute } from 'routes/linksRoute';

const app = express();

app.use(
  cors({
    origin: appConfig.clientUrl,
    credentials: true,
  }),
);
app.use(passport.initialize());

app.use(cookieParser());
app.use(express.json());

app.use('/users', authGuard, usersRoute);
app.use('/auth', authRoute);
app.use('/', linksRoute);
app.use(errorHandler);

app.listen(appConfig.appPort, (err) => {
  if (!err) {
    console.log('Server started on port -', appConfig.appPort);
  } else {
    console.error('Error starting server: ', err);
  }
});
