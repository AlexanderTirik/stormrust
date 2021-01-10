/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/naming-convention */
import { IAuthUser } from '../../models/user/IAuthUser';

declare global {
  namespace Express {
    interface User extends IAuthUser { }

    interface Request {
      user?: User;
    }
  }
}
