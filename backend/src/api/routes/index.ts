import { Express } from 'express';
import authRoute from './authRoute';

const routes = (app: Express) => {
  app.use('/api/auth', authRoute);
};

export default routes;
