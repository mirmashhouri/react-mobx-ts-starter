// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';

require('utils/Mocks/navigation');
import { GlobalStore, ScreenStore } from 'stores';
import { TOrientation, TDevice, ScreenSize } from './types';

Element.prototype.scrollTo = () => {};

describe('ScreenStore', () => {
  const store = new GlobalStore();

  const screenStore = new ScreenStore(store.coreStore);

  const initialOrientation: TOrientation = 'portrait';
  const changedOrientation: TOrientation = 'landscape';

  const initialDevice: TDevice = 'xl-desktop';
  const mobileDevice: TDevice = 'mobile';
  const tabletDevice: TDevice = 'tablet';
  const laptopDevice: TDevice = 'laptop';
  const desktopDevice: TDevice = 'desktop';
  const mddesktopDevice: TDevice = 'md-desktop';
  const xldesktopDevice: TDevice = 'xl-desktop';
  const xxldesktopDevice: TDevice = 'xxl-desktop';

  const prepareAgent = (agent: string) => {
    Object.defineProperty(window, 'navigator', {
      configurable: true,
      writable: true,
      value: { userAgent: agent },
    });
  };

  it('Initial orientation', () => {
    // Expect initial result to be portrait
    expect(screenStore.orientation).toBe(initialOrientation);
  });

  it('Changes orientation', () => {
    // Change orientation and expect result to be landscape
    act(() => screenStore.changeOrientation(changedOrientation));
    expect(screenStore.orientation).toBe(changedOrientation);
  });

  it('Initial device', () => {
    // Expect initial result to be desktop
    expect(screenStore.device).toBe(initialDevice);
  });

  it('Changes device', () => {

    // Change device to width 400 and expect result to be mobile
    prepareAgent('iPhone');
    act(() => screenStore.changeDevice(ScreenSize.MOBILE));
    expect(screenStore.device).toBe(mobileDevice);

    // Change device to width 900 and expect result to be tablet
    prepareAgent('iPad');
    act(() => screenStore.changeDevice(ScreenSize.TABLET));
    expect(screenStore.device).toBe(tabletDevice);

    // Change device to width 1200 and expect result to be laptop
    prepareAgent('Windows');
    act(() => screenStore.changeDevice(ScreenSize.LAPTOP));
    expect(screenStore.device).toBe(laptopDevice);

    // Change device to width 1400 and expect result to be desktop
    act(() => screenStore.changeDevice(ScreenSize.DESKTOP));
    expect(screenStore.device).toBe(desktopDevice);

    // Change device to width 1600 and expect result to be xl-desktop
    act(() => screenStore.changeDevice(ScreenSize.DESKTOP_MD));
    expect(screenStore.device).toBe(mddesktopDevice);

    // Change device to width 1900 and expect result to be xl-desktop
    act(() => screenStore.changeDevice(ScreenSize.DESKTOP_XL));
    expect(screenStore.device).toBe(xldesktopDevice);

    // Change device to width 2560 and expect result to be xxl-desktop
    act(() => screenStore.changeDevice(ScreenSize.DESKTOP_XXL));
    expect(screenStore.device).toBe(xxldesktopDevice);
  });
});