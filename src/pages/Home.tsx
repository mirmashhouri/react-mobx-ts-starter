import React from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import cnames from 'classnames';

import { IPage } from 'types';

import 'styles/pages/home.scss';

export const HomePage: IPage<{}> = observer(() => (
  <Container
    className={ cnames(
      'home-page',
    ) }
  >
    <section className='home-page__container'>
      <h1 className='text-white my-3'>Welcome to React MobX Starter</h1>
      <p className='text-light'>
        This boilerplate is a powerful starting point for building modern
         web applications using React, MobX, and TypeScript.
        It combines the best features of Bootstrap for responsive design and SCSS for advanced styling.
      </p>
      <Row className='home-page__features'>
        <Col
          md={ 12 }
          className='mb-4'
        >
          <h2 className='text-info'>Key Features</h2>
          <ul className='text-light'>
            <li>🚀 <b>React</b>: Build interactive UIs with a component-based architecture.</li>
            <li>📦 <b>MobX</b>: Manage your application state efficiently with a simple and intuitive API.</li>
            <li>🎨 <b>Bootstrap</b>: Quickly create responsive layouts with a mobile-first approach.</li>
            <li>✨ <b>SCSS</b>: Utilize the power of SASS for more dynamic and maintainable styles.</li>
            <li>📜 <b>TypeScript</b>: Enhance your JavaScript code with
               static type checking for better development experience.
            </li>
            <li>⚙️ <b>Webpack</b>: Use Webpack for module bundling, asset management, and optimization.</li>
            <li>🧪 <b>Jest</b>: Write and run tests easily to ensure your application works as intended.</li>
          </ul>
        </Col>
        <Col
          md={ 12 }
          className='mb-4'
        >
          <h2 className='text-info mt-4'>Available Commands</h2>
          <ul className='text-light'>
            <li><code>npm start</code>: Start the development server with hot reloading and open in browser.</li>
            <li><code>npm run start-no-open</code>: Start the development server without opening the browser.</li>
            <li><code>npm run prod</code>: Start the production server with hot reloading and open in browser.</li>
            <li><code>npm run build</code>: Build the project for production.</li>
            <li><code>npm test</code>: Run tests using Jest.</li>
          </ul>
        </Col>
      </Row>
      <Row className='home-page__features'>
        <Col
          md={ 12 }
          className='mb-4'
        >
          <h2 className='text-info'>Project Structure</h2>
          <pre className='text-light bg-dark p-3 rounded'>
            { `
BOILERPLATE/
├── .vscode/                 # VSCode configuration files
├── bundles/                 # Bundled assets and compiled code
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
├── entrypoints.config.js    # Entrypoints configuration for bundling
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
));
