import { useEffect } from 'react';
import {
  LanguageStore,
  LayoutStore,
  ThemeStore,
  ScreenStore,
  ConfigStore,
} from 'stores/index';
import 'intersection-observer';

jest.mock('utils/Hooks', () => ({
  useLanguageStore: () => LanguageStore,
  useLayoutStore: () => LayoutStore,
  useThemeStore: () => ThemeStore,
  useScreenStore: () => ScreenStore,
  useConfigStore: () => ConfigStore,

  useLanguages: () => ({
    isOpen: true,
    attachListeners: () => {},
    close: () => {},
  }),

  useNavigateTo: () => ({
    navigate: () => {},
  }),

  useIntersectionObserver: () => ({
    observer: undefined,
  }),

  useIsomorphicLayoutEffect: () => useEffect(() => {}, []),

  useEventListener: () => {},

  useOnClickOutside: () => {},

  useOnLocationChange: () => {},
}));