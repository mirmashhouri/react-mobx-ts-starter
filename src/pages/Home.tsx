import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import cnames from 'classnames';

import { LanguageSwitcher } from 'components/LanguageSwitcher';
import { IPage } from 'types';

import 'styles/pages/home.scss';
import { ThemeSwitcher } from 'components/ThemeSwitcher';

export const HomePage: IPage<{}> = observer(() => {
  const { t } = useTranslation();

  return (
    <Container
      className={ cnames(
        'home-page',
      ) }
    >
      <div className='d-flex gap-2 m-2'>
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>

      <section className='home-page__container'>
        <h1 className='my-3'>{ t('HOME.WELCOME_MESSAGE') }</h1>
        <p className=''>{ t('HOME.DESCRIPTION') }</p>
        { /* GitHub Repository Link */ }
        <Row className='home-page__features mb-3'>
          <Col
            md={ 12 }
            className='text-left'
          >
            <span className='me-2'>
              { t('LINKS.GITHUB') } :
            </span>
            <a
              href="https://github.com/mirmashhouri/react-mobx-ts-starter"
              className='link-warning'
              target='_blank'
              rel='noopener noreferrer'
            >
             https://github.com/mirmashhouri/react-mobx-ts-starter
            </a>
          </Col>
        </Row>
        <Row className="home-page__features">
          <Col
            md={ 12 }
            className="mb-4"
          >
            <h2 className="text-info">{ t('HOME.KEY_FEATURES_TITLE') }</h2>
            <ul>
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.REACT') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.MOBX') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.BOOTSTRAP') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.SCSS') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.TYPESCRIPT') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.WEBPACK') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.KEY_FEATURES.JEST') } } />
            </ul>
          </Col>
          <Col
            md={ 12 }
            className="mb-4"
          >
            <h2 className="text-info mt-4">{ t('HOME.AVAILABLE_COMMANDS_TITLE') }</h2>
            <ul>
              <li dangerouslySetInnerHTML={ { __html: t('HOME.AVAILABLE_COMMANDS.START') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.AVAILABLE_COMMANDS.START_NO_OPEN') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.AVAILABLE_COMMANDS.PROD') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.AVAILABLE_COMMANDS.BUILD') } } />
              <li dangerouslySetInnerHTML={ { __html: t('HOME.AVAILABLE_COMMANDS.TEST') } } />
            </ul>
          </Col>
        </Row>
        <Row className='home-page__features'>
          <Col
            md={ 12 }
            className='mb-4'
          >
            <h2 className='text-info'>Project Structure</h2>
            <pre className='bg-body-tertiary p-3 rounded'>
              { `
BOILERPLATE/
├── .vscode/                 # VSCode configuration files
├── build/                   # build assets and compiled code
├── node_modules/            # Project dependencies installed by npm
├── public/                  # Static assets and public files
├── src/                     # Source code for the application
│   ├── api/                 # API handling and server requests
│   ├── app/                 # Core application files
│   │   ├── Router/          # Router configuration
│   │   ├── App.tsx          # Main App component
│   │   ├── AppWrapper.tsx   # Higher-order component for wrappers
│   │   ├── context.ts       # Context API logic
│   │   ├── coreContext.ts   # Core context setup
│   │   ├── index.tsx        # Application entry point
│   │   ├── reportWebVitals.ts # Web performance reporting
│   │   └── setupTests.ts    # Jest test setup file
│   ├── components/          # Reusable UI components
│   │   └── Spinner/         # Loading spinner component
│   ├── pages/               # Application pages
│   │   ├── 404.tsx          # 404 error page
│   │   ├── AuthenticationError.tsx # Authentication error page
│   │   └── Home.tsx         # Home page
│   ├── stores/              # MobX stores for state management
│   ├── styles/              # SCSS stylesheets
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── .eslintignore            # ESLint ignore rules
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── jest.config.js           # Jest configuration
├── jest.file_mocks.js       # Jest file mock for static assets
├── jest.style_mocks.js      # Jest style mock for CSS/SCSS imports
├── package.json             # Project dependencies and scripts
├── package-lock.json        # Locked versions of dependencies
└── postcss.config.js        # PostCSS configuration for processing CSS
` }
            </pre>
          </Col>
        </Row>
      </section>
    </Container>
  );
});
