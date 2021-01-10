import { RouterState } from 'connected-react-router';
import { IUserState } from '../../../reducers/user';

export interface IAppState {
  router: RouterState;
  user: IUserState;
}
