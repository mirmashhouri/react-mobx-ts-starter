import { TLayout } from './types';

// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';
require('utils/Mocks/navigation');

import { GlobalStore, LayoutStore, ScreenSize, ScreenStore } from 'stores';

describe('LayoutStore', () => {
  const globalStore = new GlobalStore();

  const screenStore = new ScreenStore(globalStore.coreStore);
  globalStore.coreStore.lazyStoreRegistry._stores.screenStore = screenStore;

  const layoutStore = new LayoutStore(globalStore.coreStore);
  globalStore.coreStore.lazyStoreRegistry._stores.layoutStore = layoutStore;

  const initialResult: TLayout = 'cols';
  const changedResult: TLayout = 'rows';

  it('Changes layout', () => {
    screenStore.changeDevice(ScreenSize.MOBILE);
    // Expect initial result to be cols
    expect(layoutStore.layout).toBe(initialResult);

    // Change layout and expect result to be rows
    act(() => layoutStore.setLayout(changedResult));
    expect(layoutStore.layout).toBe(changedResult);
  });

});