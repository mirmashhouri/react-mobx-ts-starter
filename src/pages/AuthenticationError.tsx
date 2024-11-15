import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cnames from 'classnames';

import { IPage } from 'types';

import 'styles/pages/error.scss';

export const AuthenticationErrorPage: IPage<{}> = observer(() => {
  const { t } = useTranslation();

  return (
    <section className='error-page'>
      <div className='d-flex align-items-center justify-content-center h-100 flex-column'>
        <img src={ window.location.origin + '/assets/authentication-failed.svg' } />
        <h2
          className={ cnames(
            'text-center mt-3-rem heading-1',
          ) }
        >
          { t('ERRORS.AUTHENTICATION_ERROR') }
        </h2>
        <p className='heading-3'>
          { t('ERRORS.AUTHENTICATION_MESSAGE') }
        </p>
      </div>
    </section>
  );
});
