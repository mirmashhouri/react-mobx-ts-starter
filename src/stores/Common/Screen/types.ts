export interface IScreen {
  device: TDevice,
  orientation: TOrientation,
  centerArea: TCenterArea
}

export type TDevice = 'small-mobile'
| 'mobile'
| 'tablet'
| 'laptop'
| 'desktop'
| 'md-desktop'
| 'xl-desktop'
| 'xxl-desktop';

export type TOrientation = 'portrait' | 'landscape';

export type TCenterArea = { top: number, bottom: number, left: number, right: number };

export const ScreenSize = Object.freeze({
  SMALL_MOBILE: 360,
  MOBILE: 576,
  TABLET: 1025,
  LAPTOP: 1200,
  DESKTOP: 1400,
  DESKTOP_MD: 1600,
  DESKTOP_XL: 1920,
  DESKTOP_XXL: 2560,
});
