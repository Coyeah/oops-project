import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import Authorized from './Authorized';
import { TAuthority } from './CheckPermissions';

interface IAuthorizedRouteProps {
  // currentAuthority: string;
  component?: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath: string;
  authority: TAuthority

  [name: string]: any;
}

const AuthorizedRoute: React.FC<IAuthorizedRouteProps> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest} render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route {...rest} render={(props: any) => (Component ? <Component {...props} /> : render(props))} />
  </Authorized>
)

export default AuthorizedRoute;