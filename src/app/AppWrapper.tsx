declare global {
  interface Window { bridge: Window }
}

import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { App, useAppContext } from 'app/App';
import { CoreStoreProvider } from 'stores';

export const AppWrapper: FC<{}> = observer(() => {
  const { store: {
    coreStore,
  } } = useAppContext();

  const [config, updateConfig] = useState<any>();

  useEffect(() => {
    const getConfig = async () => {
      const resp = await fetch(`${location.origin}/config.json`);
      const json = await resp.json();
      updateConfig(json);
    };
    getConfig();
  }, []);

  return (
    config && (
      <CoreStoreProvider.Provider value={ coreStore }>
        <App />
      </CoreStoreProvider.Provider>
    )
  );
});
