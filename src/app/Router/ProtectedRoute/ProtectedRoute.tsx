import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';

import { ProtectedRouteProps } from './types';
import { useConfigStore } from 'stores/index';

export const ProtectedRoute = observer(({ isAuthenticated, authenticationPath, outlet }: ProtectedRouteProps) => {
  const { queryParams } = useConfigStore();
  if (isAuthenticated) {
    return outlet;
  } else {
    return (
      <Navigate
        to={ {
          pathname: authenticationPath,
          search: `${queryParams}`,
        } }
      />
    );
  }
});