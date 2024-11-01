import { createContext } from 'react';

import { GlobalStore } from 'stores';

type IAppContext = {
  store: GlobalStore;
};

export default createContext<IAppContext>({
  store: new GlobalStore(),
});
