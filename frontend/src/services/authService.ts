import api from '../common/helpers/apiHelper';

export const fetchUser = async () => (
  api.get('/api/auth/me')
);
