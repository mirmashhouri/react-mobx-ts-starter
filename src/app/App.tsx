import React, { Suspense, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter as BRouter } from 'react-router-dom';

import appContext from './context';
import { useDisposer } from 'utils/Hooks';
import { useConfigStore } from 'stores';
import { Spinner } from 'components/Spinner';
import { Router } from './Router/Router';

if ((document as any).wasDiscarded) {
  (window.location as any).reload(true); // only firefox has parameter to force not using cache
}

export const useAppContext = () => useContext(appContext);

export const App = observer(() => {
  useConfigStore();
  useDisposer();

  return (
    <>
      <Suspense fallback={ <Spinner /> }>
        <BRouter>
          { <Router /> }
        </BRouter>
      </Suspense>
    </>
  );
});

