import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import Authorized from './Authorized';
import { AuthorityType } from './CheckPermissions';

export interface AuthorizedRouteProps {
  // currentAuthority: string;
  component?: React.ComponentClass<any, any>;
  render: (props: any) => React.ReactNode;
  redirectPath?: string;
  authority?: AuthorityType;
}

interface AnyObject {
  [name: string]: any;
}

const AuthorizedRoute: React.FC<AuthorizedRouteProps & AnyObject> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={
      redirectPath ? (
        <Route
          {...rest}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      ) : null
    }
  >
    <Route
      {...rest}
      render={(props: any) =>
        Component ? <Component {...props} /> : render(props)
      }
    />
  </Authorized>
);

export default AuthorizedRoute;
