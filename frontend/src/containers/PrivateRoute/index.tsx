import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';
import { IAppState } from '../../common/models/store/IAppState';

interface IProps {
  component: FunctionComponent<any>;
  isAuthorized: boolean;
  [rest: string]: any;
}

const PrivateRoute: FunctionComponent<IProps> = ({
  component: Component,
  isAuthorized,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      !isAuthorized
        ? <Redirect to={{ pathname: Routes.Dashboard, state: { from: props.location } }} />
        : <Component {...props} />
    )}
  />
);

const mapStateToProps = (state: IAppState) => {
  const { user: { isAuthorized } } = state;
  return {
    isAuthorized
  };
};

export default connect(mapStateToProps)(PrivateRoute);
