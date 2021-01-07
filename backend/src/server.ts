import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'passport';
import { env } from './env';
import routes from './api/routes';
import { createConnection } from 'typeorm';
import "reflect-metadata";
import './config/passportConfig';
import errorHandlingMiddleware from './api/middlewares/errorHandlingMiddleware';

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandlingMiddleware);
app.use(passport.initialize());
routes(app);

app.listen(env.app.port, async () => {
  try {
    await createConnection();
  } catch (error) {
    console.log('App started with error:', error);
  }

  console.log(`Server is running at ${env.app.port}.`);
});

export default app;
