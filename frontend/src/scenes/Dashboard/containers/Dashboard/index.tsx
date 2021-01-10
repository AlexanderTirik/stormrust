import { push } from 'connected-react-router';
import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Routes } from '../../../../common/enums/Routes';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { env } from '../../../../env';

const { server } = env.urls;

interface IProps {
  routerPush: IBindingCallback<Routes>;
}

const Dashboard: FunctionComponent<IProps> = ({ routerPush }) => (
  <>
    <span>Dashboard</span>
    <a href={`${server}/api/auth/login`}>Login</a>
    <button onClick={() => routerPush(Routes.Profile)} type="button">To profile</button>
  </>
);

const mapDispatchToProps = {
  routerPush: push
};

export default connect(null, mapDispatchToProps)(Dashboard);
