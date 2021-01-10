import React, { FunctionComponent, useEffect } from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../common/models/store/IAppState';
import { parse } from 'query-string';
import { getAccessToken, setTokens } from '../../common/helpers/storageHelper';
import { ITokens } from '../../common/models/fetch/ITokens';
import { fetchUserRoutine } from '../../routines/user';
import { IBindingAction } from '../../common/models/callback/IBindingAction';
import { push } from 'connected-react-router';
import { Routes } from '../../common/enums/Routes';
import { IBindingCallback } from '../../common/models/callback/IBindingCallback';

interface IProps {
  isAuthorized: boolean;
  search: string;

  routerPush: IBindingCallback<Routes>;
  fetchUser: IBindingAction;
}

const Login: FunctionComponent<IProps> = ({
  isAuthorized,
  search,
  fetchUser,
  routerPush
}) => {
  useEffect(() => {
    if (!isAuthorized) {
      const { accessToken, refreshToken } = parse(search);
      if (accessToken && refreshToken) {
        setTokens({ accessToken, refreshToken } as ITokens);
      }
      if (getAccessToken()) {
        fetchUser();
      } else {
        routerPush(Routes.Dashboard);
      }
    } else {
      routerPush(Routes.Dashboard);
    }
  }, [isAuthorized]);
  return (
    <span>
      is auth:
      {`${isAuthorized}`}
    </span>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { user: { isAuthorized }, router: { location: { search } } } = state;
  return {
    isAuthorized,
    search
  };
};

const mapDispatchToProps = {
  fetchUser: fetchUserRoutine,
  routerPush: push
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
