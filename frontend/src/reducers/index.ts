import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import user from './user';
import { history } from '../common/helpers/historyHelper';

export default combineReducers({
  router: connectRouter(history),
  user
});
