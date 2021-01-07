import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/pathHelper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('STORMRUST_PORT') || 3001,
    client: getOsEnv('REACT_APP_CLIENT'),
    server: getOsEnv('REACT_APP_SERVER')
  },
  steam: {
    apiKey: getOsEnv('STEAM_API_KEY')
  }
};
