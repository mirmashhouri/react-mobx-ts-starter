import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

import { useThemeStore } from 'stores/index';

import { IThemeSwitcher } from './types';
import './styles.scss';

export const ThemeSwitcher: IThemeSwitcher = observer(() => {
  const { isDark, setLightTheme, setDarkTheme } = useThemeStore();

  const toggleTheme = () => {
    if (isDark) {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  return (
    <div>
      <Button onClick={ toggleTheme }>
        { isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme' }
      </Button>
    </div>
  );
});
