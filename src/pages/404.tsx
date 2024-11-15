import React from 'react';
import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import cnames from 'classnames';

import { IPage } from 'types';

import 'styles/pages/error.scss';

export const FourZeroFourPage: IPage<{}> = observer(() => {

  const { t } = useTranslation();

  return (
    <section className='error-page'>
      <div
        className={ cnames(
          'd-flex align-items-center justify-content-center flex-column',
          'h-100',
        ) }
      >
        <img
          className={ cnames( 'w-45' ) }
          src={ window.location.origin + '/assets/404.png' }
        />
        <h2 className='heading-1 mt-3-rem'>
          { t('ERRORS.404') }
        </h2>
        <p className='heading-3'>
          { t('ERRORS.REQUESTED_URL_NOT_EXIST') }
        </p>
      </div>
    </section>
  );
});
