import React from 'react';
import { observer } from 'mobx-react-lite';
import cnames from 'classnames';

import { ISpinner } from './types';

import './styles.scss';

export const Spinner: ISpinner = observer(() => (
  <div
    className={
      cnames(
        'spinner-icon',
        'position-absolute top-50 left-50',
        'w-10-rem h-10-rem',
        'text-center translate-middle',
        'z-index-layout',
      )
    }
  >
    <div className='position-absolute w-100 h-100 top-50 left-50 translate-middle'>
      <div
        className="spinner-border w-100 h-100 fs-1"
        role="status"
      />
    </div>
    <div className='position-absolute w-75 top-50 left-50 translate-middle p-2'>
      <img
        src={ `${window.location.origin}/assets/logo.png` }
        alt="React-MobX-Starter"
      />
    </div>
  </div>
));
