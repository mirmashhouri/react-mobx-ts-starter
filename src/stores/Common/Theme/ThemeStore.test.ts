
// eslint-disable-next-line import/no-extraneous-dependencies
import { act } from 'react-dom/test-utils';

require('utils/Mocks/navigation');

import { globalStoreMock } from 'utils/Mocks';
import { ThemeStore } from 'stores';

describe('ThemeStore', () => {
  const store = new ThemeStore(globalStoreMock.coreStore);

  it('set Theme Path', () => {
    const themeLight = 'light.css';
    const themeDark = 'dark.css';
    const LinkTag = 'link';

    // expect to change theme to light
    act(() => store.setThemePath(themeLight));
    expect(store.themePath).toStrictEqual(themeLight);
    expect(store.isLight).toStrictEqual(true);

    // expect to change theme to dark
    act(() => store.setThemePath(themeDark));
    expect(store.themePath).toStrictEqual(themeDark);
    expect(store.isDark).toStrictEqual(true);

    // expect to add dark theme to document
    expect(document.head.getElementsByTagName(LinkTag)[0].href).toContain(themeDark);
  });
});