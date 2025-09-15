import express from 'express';
import { appConfig } from 'configuration/appConfig';
import { usersRoute } from 'routes/usersRoute';

const app = express();

app.use(express.json());

app.use('/users', usersRoute);

app.listen(appConfig.appPort, (err) => {
  if (!err) {
    console.log('Server started on port -', appConfig.appPort);
  } else {
    console.error('Error starting server: ', err);
  }
});
