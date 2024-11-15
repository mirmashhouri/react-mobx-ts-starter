import { useEffect } from 'react';
import {
  LanguageStore,
  ThemeStore,
  ConfigStore,
} from 'stores/index';
import 'intersection-observer';

jest.mock('utils/Hooks', () => ({
  useLanguageStore: () => LanguageStore,
  useThemeStore: () => ThemeStore,
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