import { Router } from 'express';
import { IAuthUser } from '../../common/models/user/IAuthUser';
import { env } from '../../env';
import { login } from '../../services/auth.service';
import url from 'url';
import { steamMiddleware } from '../middlewares/steamMiddleware';

const router = Router();

const { client } = env.app;

router
  .get('/login', steamMiddleware)
  .get('/login/return', steamMiddleware, async (req, res) => {
    const tokens = await login(req.user as IAuthUser);    
    res.redirect(client + url.format({
      query: {
        ...tokens
      }
    }));
  })

export default router;
