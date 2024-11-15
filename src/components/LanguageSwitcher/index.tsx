import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button } from 'react-bootstrap';

import { useLanguageStore } from 'stores/index';

import { ILanguageSwitcher } from './types';
import './styles.scss';

export const LanguageSwitcher: ILanguageSwitcher = observer(() => {
  const { changeLanguage } = useLanguageStore();

  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', '"en"');
  }

  return (
    <div className='d-flex gap-2'>
      <Button
        onClick={ () => changeLanguage('en') }
      >EN
      </Button>
      <Button
        onClick={ () => changeLanguage('de') }
      >DE
      </Button>
    </div>
  );
});
