import { createContext } from 'react';

import { ICoreStore } from 'stores';

export default createContext<ICoreStore>(
  (null as unknown) as ICoreStore,
);