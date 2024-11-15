import React from 'react';
import { createRoot } from 'react-dom/client';

// import registerServiceWorker from './registerServiceWorker';

import reportWebVitals from './reportWebVitals';

// Import local i18n to be bundled
import 'utils/Common/i18nLocal';
import { AppWrapper } from './AppWrapper';
import 'bootstrap/dist/css/bootstrap.css';

declare global {
}

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

if (root !== null) {
  root.render(
    <AppWrapper />,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// registerServiceWorker();
