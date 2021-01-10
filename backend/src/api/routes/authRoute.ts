import { Request, Router } from 'express';
import url from 'url';
import { IAuthUser } from '../../common/models/user/IAuthUser';
import { env } from '../../env';
import { getAuthUser, login, refreshTokens } from '../../services/auth.service';
import { steamMiddleware } from '../middlewares/steamMiddleware';
import { run } from '../../common/helpers/routeHelper';

const router = Router();

const { client } = env.app;

router
  .get('/login', steamMiddleware)
  .get('/login/return', steamMiddleware, async (req, res) => {
    const tokens = await login(req.user as IAuthUser);
    res.redirect(client + url.format({
      pathname: '/login',
      query: {
        ...tokens
      }
    }));
  })
  .get('/me', run((req: Request) => getAuthUser(req.user.id)))
  .post('/tokens', run((req: Request) => refreshTokens(req.body.refreshToken)));

export default router;
