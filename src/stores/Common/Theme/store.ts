import {
  makeObservable, observable, action, reaction, computed, IReactionDisposer,
} from 'mobx';
import { CoreStore, useLazyStoreInstanceOrCreate } from 'stores';
import { ICSSVariable, parseCSSVars } from 'utils/Parser/parseCSSVars';

export class ThemeStore {
  @observable themePath: string = 'dark';

  private readonly coreStore: CoreStore;

  private readonly link: HTMLLinkElement;

  private themeStyles: Map<string, ICSSVariable> = new Map();

  private readonly _disposerThemeStore: IReactionDisposer;

  constructor(coreStore: CoreStore) {
    this.coreStore = coreStore;
    this.link = document.createElement('link');
    this.link.type = 'text/css';
    this.link.rel = 'stylesheet';
    makeObservable(this);

    this._disposerThemeStore = reaction(
      () => [this.themePath],
      () => this.setTheme(),
    );
  }

  disposeThemeStore = () => {
    this._disposerThemeStore();
  };

  @computed
  get isDark() {
    return this.themePath.toLowerCase().includes('dark');
  }

  @computed
  get isLight() {
    return this.themePath.toLowerCase().includes('light');
  }

  @action
    setThemePath = (path: string) => {
      this.themePath = path;
    };

  @action
    resetTheme = () => {
      document.head.removeChild(this.link);
    };

  @action
    setTheme = () => {
      this.link.href = this.themePath;
      document.head.appendChild(this.link);
    };

  @action
    setLightTheme = () => {
      document.documentElement.setAttribute('data-bs-theme', 'light');
      this.themePath = 'light'; // Optional: maintain state for the current theme
    };

  @action
    setDarkTheme = () => {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      this.themePath = 'dark'; // Optional: maintain state for the current theme
    };

  requestStyles = () => {
    const hasComments = this.themeStyles.size > 0;
    if (hasComments) {
      this.readThemeStyles();
    } else {
      this.readDefaultTheme();
    }
  };

  setThemeValues = (values: any) => {
    const rootStyle = document.querySelector<HTMLElement>(':root')?.style;
    if (!rootStyle) {
      console.warn('ThemeStore::setThemeValues(): rootStyle == null');
      return;
    }

    for (let key in values) {
      rootStyle.setProperty(key, values[key]);
    }
  };

  private readDefaultTheme = () => {
    this.link.onload = this.readThemeStyles;
    fetch('/styles/theme_defaults.css')
      .then(response => response.text())
      .then(data => this.parseDefaultTheme(data))
      .catch(err => console.warn('ThemeStore::readThemeComments(): fetch error:', err));
  };

  private readThemeStyles = () => {
    if (!this.link.href) {
      console.warn('ThemeStore::readThemeStyles(): No link href');
      return;
    }

    fetch(this.link.href)
      .then(response => response.text())
      .then(data => this.parseLoadedThemeValues(data))
      .catch(err => console.warn('ThemeStore::readThemeStyles(): fetch error:', err));
  };

  private parseDefaultTheme = (data: string) => {
    if (!data) {
      console.warn('ThemeStore::parseThemeComments(): No data!');
      return;
    }

    const themeDefaults = parseCSSVars(data);
    if (!(themeDefaults.length > 0)) {
      console.warn('ThemeStore::parseThemeComments(): No theme defaults parsed!');
      return;
    }

    for (const themeVar of themeDefaults) {
      this.themeStyles.set(themeVar.key, { ...themeVar });
    }
    this.readThemeStyles();
  };

  private parseLoadedThemeValues = (data: string) => {
    const styles = parseCSSVars(data);
    for (const style of styles) {
      const themeStyle = this.themeStyles.get(style.key);
      if (!themeStyle) {
        console.warn('ThemeStore::parseThemeVariables(): Unknown style:', style.key);
        continue;
      }

      themeStyle.value = style.value;
    }
    // this.sendStyles();
  };
}

export function themeStoreGetter(coreStore: CoreStore) {
  return new ThemeStore(coreStore);
}

export const useThemeStore = () =>
  useLazyStoreInstanceOrCreate<ThemeStore>({
    storeName: 'themeStore',
    storeGetter: themeStoreGetter,
  });