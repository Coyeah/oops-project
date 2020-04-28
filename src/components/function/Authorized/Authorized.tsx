import React from 'react';
import check, { TAuthority } from './CheckPermissions';

import AuthorizedRoute from './AuthorizedRoute';
import Secured from './Secured';

interface IAuthorizedProps {
  authority: TAuthority;
  noMatch?: React.ReactNode;
}

export type AuthorizedType = React.FunctionComponent<IAuthorizedProps> & {
  Secured: typeof Secured;
  check: typeof check;
  AuthorizedRoute: typeof AuthorizedRoute;
};

const Authorized: React.FunctionComponent<IAuthorizedProps> = ({
  children,
  authority,
  noMatch = null,
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children;
  const dom = check(authority, childrenRender, noMatch);
  return <>{dom}</>;
};

export default Authorized as AuthorizedType;
