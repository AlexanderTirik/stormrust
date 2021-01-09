import Cryptr from 'cryptr';
import { env } from '../../env';

const cryptr = new Cryptr(env.app.secret);

export const encrypt = (data: string) => cryptr.encrypt(data);

export const decrypt = (data: string) => cryptr.decrypt(data);