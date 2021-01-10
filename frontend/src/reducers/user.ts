import { Routine } from 'redux-saga-routines';
import { IUser } from '../common/models/user/IUser';
import { fetchUserRoutine } from '../routines/user';

export interface IUserState {
  user?: IUser;
  isLoading: boolean;
  isAuthorized: boolean;
}

const initialState: IUserState = {
  isLoading: false,
  isAuthorized: false
};

const reducer = (state = initialState, { type, payload }: Routine<any>): IUserState => {
  switch (type) {
    case fetchUserRoutine.TRIGGER: {
      return {
        ...state,
        isLoading: true
      };
    }
    case fetchUserRoutine.SUCCESS: {
      return {
        ...state,
        user: payload,
        isAuthorized: true,
        isLoading: false
      };
    }
    case fetchUserRoutine.FAILURE: {
      return {
        ...state,
        isAuthorized: false,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export default reducer;

