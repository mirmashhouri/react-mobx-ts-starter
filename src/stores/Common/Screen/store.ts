import { makeObservable, observable, action, computed } from 'mobx';
import {
  CoreStore,
  useLazyStoreInstanceOrCreate,
} from 'stores';
import { TDevice, TOrientation, TCenterArea, ScreenSize } from './types';

export class ScreenStore {

  readonly coreStore: CoreStore;

  isPointerDown: boolean = false;

  readonly pointerPos = { x: 0, y: 0 };

  @observable width: number = 0;

  @observable height: number = 0;

  @observable device: TDevice = 'xl-desktop';

  @observable orientation: TOrientation = 'portrait';

  @observable centerArea: TCenterArea = { top: 0, bottom: 0, left: 0, right: 0 };

  @observable isFullScreen: boolean = false;

  @observable isSmallDesktop: boolean = false;

  private readonly _viewportSizeInterval: number = 0;

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;
    this.setView();
    this.attachListeners();

    makeObservable(this);
    this._viewportSizeInterval = window.setInterval(this.updateViewportSize, 33); // about 30 fps
  }

  disposeScreenStore = () => {
    window.clearInterval(this._viewportSizeInterval);
    this.detachListeners();
  };

  attachListeners = () => {
    // window.addEventListener('resize', this.setView);
    document.addEventListener('fullscreenchange', this.setFullScreen);
    document.addEventListener('webkitfullscreenchange', this.setFullScreen);
    window.addEventListener('keydown', this.disableF11.bind(this));
    document.addEventListener('touchmove', this.handleScaleEvents.bind(this), { passive: false });
    document.body.addEventListener('pointerdown', this.onPointerUpDown);
    document.body.addEventListener('pointerup', this.onPointerUpDown);
    document.body.addEventListener('pointermove', this.onPointerMove);
  };

  detachListeners = () => {
    // window.removeEventListener('resize', this.setView);
    document.removeEventListener('fullscreenchange', this.setFullScreen);
    document.removeEventListener('webkitfullscreenchange', this.setFullScreen);
    window.removeEventListener('keydown', this.disableF11.bind(this));
    document.removeEventListener('touchmove', this.handleScaleEvents.bind(this));
    document.body.removeEventListener('pointerdown', this.onPointerUpDown);
    document.body.removeEventListener('pointerup', this.onPointerUpDown);
    document.body.removeEventListener('pointermove', this.onPointerMove);
  };

  @computed
  get isBelowDesktop() {
    return (
      this.device === 'desktop' ||
      this.device === 'laptop' ||
      this.device === 'tablet' ||
      this.device === 'mobile'
    );
  }

  @computed
  get isBelowLaptop() {
    return (
      this.device === 'laptop' ||
      this.device === 'tablet' ||
      this.device === 'mobile'
    );
  }

  @computed
  get isBelowTablet() {
    return this.device === 'tablet' || this.device === 'mobile' || this.device === 'small-mobile';
  }

  @computed
  get isMobile() {
    return this.device === 'mobile' || this.device === 'small-mobile';
  }

  @computed
  get isMobilePortrait() {
    return this.device === 'mobile' && !this.isLandscape;
  }

  @computed
  get isLandscape() {
    return this.orientation === 'landscape';
  }

  @computed
  get isAppleDevice() {
    return this.isIOS() || this.isIpadOS() || this.isSafari();
  }

  @computed
  get isIosOrIpad() {
    return this.isIOS() || this.isIpadOS();
  }

  @action
    setIsFullScreen = (isFullScreen: boolean) => {
      this.isFullScreen = isFullScreen;
    };

  @action
    setFullScreen = () => {
      const safariFullScreenElement = (document as any).webkitFullscreenElement !== null;
      if (this.isAppleDevice) {
        this.isFullScreen = safariFullScreenElement ? true : false;
      } else {
        this.isFullScreen = document.fullscreenElement !== null ? true : false ;
      }

    };

  @action
    setSmallDesktop = (isSmallDesktop: boolean) => {
      this.isSmallDesktop = isSmallDesktop;
    };

  private isIOS = () => {
    let platform = (navigator as any).userAgentData?.platform || navigator?.platform || 'unknown';
    if (/iPhone|iPod/.test(platform)) {
      return true;
    } else {
      return navigator.maxTouchPoints &&
          navigator.maxTouchPoints > 2 &&
          /MacIntel/.test(platform);
    }
  };

  private isIpadOS = () => {
    const agent = navigator.userAgent;
    let platform = (navigator as any).userAgentData?.platform || navigator?.platform || 'unknown';

    return (agent.indexOf('iPad') > 0) || navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2 &&
        /MacIntel/.test(platform);
  };

  private isSafari = () => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    return isSafari;
  };

  @action
    changeDevice = (width: number) => {
      this.setSmallDesktop(false);
      const agent = navigator.userAgent,
        isWebkit = (agent.indexOf('AppleWebKit') > 0),
        isIPad = this.isIpadOS(),
        isIOS = (agent.indexOf('iPhone') > 0 || agent.indexOf('iPod') > 0) || this.isIOS(),
        isAndroid = (agent.indexOf('Android') > 0),
        isNewBlackBerry = (agent.indexOf('AppleWebKit') > 0 && agent.indexOf('BlackBerry') > 0),
        isWebOS = (agent.indexOf('webOS') > 0),
        isWindowsMobile = (agent.indexOf('IEMobile') > 0),
        actualWidth = screen.width < screen.height ? screen.width : screen.height,
        isSmallScreen = (actualWidth < 700),
        isUnknownMobile = (isWebkit && isSmallScreen),
        isMobile = (isIOS || isAndroid || isNewBlackBerry || isWebOS || isWindowsMobile || isUnknownMobile),
        isTablet = (isIPad || (isMobile && !isSmallScreen));

      if (isTablet) {
        this.device = 'tablet';
      } else if (isMobile && width <= ScreenSize.SMALL_MOBILE) {
        this.device = 'small-mobile';
      } else if (isMobile) {
        this.device = 'mobile';
      } else {
        switch (true) {
          case width <= ScreenSize.SMALL_MOBILE:
            this.device = 'small-mobile';
            break;
          case width <= ScreenSize.MOBILE:
            this.device = 'mobile';
            break;
          case width <= ScreenSize.TABLET:
            this.device = 'tablet';
            break;
          case width <= ScreenSize.LAPTOP:
            this.device = 'laptop';
            break;

          case width <= ScreenSize.DESKTOP:
            this.device = 'desktop';
            break;

          case width <= ScreenSize.DESKTOP_MD:
            this.device = 'md-desktop';
            break;

          case width <= ScreenSize.DESKTOP_XL:
            this.device = 'xl-desktop';
            break;

          default:
            this.device = 'xxl-desktop';
            break;
        }
      }

      document.body.className = '';

      if (!this.isBelowTablet) {
        document.body.classList.add('desktop');
      } else if (this.device === 'small-mobile') {
        document.body.classList.add('mobile');
      } else {
        if (!isMobile && !isTablet) {
          document.body.classList.add('small-desktop');
          this.setSmallDesktop(true);
        }
      }

      document.body.classList.add(this.device);
    };

  @action
    setDevice = (device: TDevice) => {
      this.device = device;
    };

  @action
    changeOrientation = (orientation: TOrientation) => {
      this.orientation = orientation;
    };

  @action
    setView = () => {
      const vw = window.visualViewport?.width ?? window.innerWidth;
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const iframeHeight = vh;
      const iframeWidth = vw;
      const w = Math.min(screen.width, vw, iframeWidth);
      const h = Math.min(screen.height, vh, iframeHeight);

      if (this.width === w && this.height === h)
        return;

      this.width = w;
      this.height = h;
      document.documentElement.style.setProperty('--viewport-width', `${w}px`);
      document.documentElement.style.setProperty('--viewport-height', `${h}px`);

      // Apply footer offset for Android Chrome full-screen bug
      const footerOffsetY = screen.height >= window.innerHeight ? -1 : vh - screen.height - 1;
      document.documentElement.style.setProperty('--footer-offset-y', `${footerOffsetY}px`);

      // Safari fix for when the keyboard is open and the whole HTML is at negative Y
      if (this.isAppleDevice && this.isBelowTablet) {
        document.body.style.removeProperty('top');

      }

      const xCenter = 0.45;
      const yCenter = 0.15;
      this.centerArea.left = w / 2 - w * xCenter;
      this.centerArea.right = w / 2 + w * xCenter;
      this.centerArea.top = h / 2 - h * yCenter;
      this.centerArea.bottom = h / 2 + h * yCenter;
      this.changeOrientation(w < h ? 'portrait' : 'landscape');
      this.changeDevice(w);
    };

  private onPointerUpDown = (e: any) => {
    this.isPointerDown = e.type === 'pointerdown';
    // TODO: Remove that "if" after Android Chrome fix their fullscreen height bug
    if (e.type === 'pointerup') {
      document.documentElement.style.setProperty('--footer-offset-y', '-1px');
    }
  };

  private onPointerMove = (e: any) => {
    this.pointerPos.x = e.clientX;
    this.pointerPos.y = e.clientY;
  };

  private updateViewportSize = () => {
    this.setView();
  };

  private disableF11 = (event: KeyboardEvent) => {
    if (event.key === 'F11') {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  private handleScaleEvents = (event: any) => {
    if (event.scale && (event as any).scale !== 1) { event.preventDefault(); }
  };
}

export const screenStoreGetter = (coreStore: CoreStore) => new ScreenStore(coreStore);

export const useScreenStore = () =>
  useLazyStoreInstanceOrCreate<ScreenStore>({
    storeName: 'screenStore',
    storeGetter: screenStoreGetter,
  });