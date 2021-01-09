import passport from 'passport';
import { Strategy as SteamStrategy } from 'passport-steam';
import { env } from '../env';
import { getCreatedOrExistUser } from '../services/auth.service';

const { server, port } = env.app;
const { apiKey } = env.steam;

const validateUser = async (_identifier: any, profile: any, done: any) => {
  const { id, displayName } = profile;
  const user = await getCreatedOrExistUser({ steamId: id, displayName });

  done(null, user);
};

const options = {
  returnURL: `${server}:${port}/api/auth/login/return`,
  realm: `${server}:${port}`,
  apiKey
};

passport.use(new SteamStrategy(options, validateUser));
