/* eslint-disable import/no-extraneous-dependencies */
import { GlobalStore, NetworkStore } from 'stores';
import { Req } from '..';
import { waitFor } from '@testing-library/react';

require('utils/Mocks/navigation');

describe('NetworkStore', () => {
  const globalStore = new GlobalStore();
  const networkStore = new NetworkStore(globalStore.coreStore);
  const openHandler = jest.fn();
  const failingReqFn = async () => {
    throw new Error('some error');
  };

  const failingReq = new Req(failingReqFn);
  failingReq.logErrors = false;

  it('To be online by default, before any requests are being made', () => {
    expect(networkStore.isOnline).toBeTruthy();
  });

  it('No popup open to be called when online', () => {
    expect(networkStore.isOnline).toBeTruthy();
    expect(openHandler).toBeCalledTimes(0);
  });

  it('Open popup when offline', async () => {
    networkStore.registerRequest(failingReq);
    await failingReq.request();
    expect(networkStore.isOnline).toBeFalsy();
    waitFor(() => {
      expect(openHandler).toBeCalled();
    }, { timeout: 3000 });
  });
});