import { Router } from 'express';
import passport from 'passport';
import { env } from '../../env';

const router = Router();

const { client } = env.app;

router
  .get('/login', passport.authenticate('steam', {
    session: false
  }))
  .get('/login/return', passport.authenticate('steam', {
    session: false
  }), (_req, res) => (
      res.redirect(client)
  ))

export default router;
