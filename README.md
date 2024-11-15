# React MobX TypeScript Starter

Welcome to the **React MobX TypeScript Starter**! This boilerplate is designed as a robust starting point for building modern web applications using React, MobX, TypeScript, Bootstrap, and SCSS.

## Project Structure

Here's an overview of the main folders and files in this project:

```plaintext
BOILERPLATE/
├── .vscode/                     # VSCode configuration files
├── bundles/                     # Bundled assets and compiled code
├── node_modules/                # Project dependencies installed by npm
├── public/                      # Static assets and public files
├── src/                         # Source code for the application
│   ├── api/                     # API handling and server requests
│   ├── app/                     # Core application files
│   │   ├── Router/              # Router configuration
│   │   ├── App.tsx              # Main App component
│   │   ├── AppWrapper.tsx       # Higher-order component for wrappers
│   │   ├── context.ts           # Context API logic
│   │   ├── coreContext.ts       # Core context setup
│   │   ├── index.tsx            # Application entry point
│   │   ├── reportWebVitals.ts   # Web performance reporting
│   │   └── setupTests.ts        # Jest test setup file
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Application pages
│   ├── stores/                  # MobX stores for state management
│   ├── styles/                  # SCSS stylesheets
│   ├── types/                   # TypeScript type definitions
│   └── utils/                   # Utility functions
├── .eslintignore                # ESLint ignore rules
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── jest.config.js               # Jest configuration
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
└── webpack.config.js            # Webpack configuration for bundling and optimization
```

## Key Features

- **React**: Build interactive UIs with a component-based architecture.
- **MobX**: Efficiently manage application state with a simple and intuitive API.
- **TypeScript**: Add static type checking for a better development experience.
- **Bootstrap**: Create responsive layouts with a mobile-first approach.
- **SCSS**: Utilize the power of SASS for dynamic, maintainable styles.
- **Webpack**: Handle module bundling, asset management, and optimization.
- **Jest**: Write and run tests to ensure your application works as intended.
- **Multilingual Support**: Easily add support for multiple languages through a simple and flexible localization setup.

## Available Scripts

Run these scripts using `npm`:

- **`npm start`**: Start the development server with hot reloading.
- **`npm run start-no-open`**: Start the development server without opening the browser.
- **`npm run prod`**: Start the production server with hot reloading.
- **`npm run build`**: Build the project for production.
- **`npm test`**: Run tests with Jest.

## Installation

### Prerequisites

- **Node.js**: Make sure you have Node.js installed.
- **npm**: Use npm (comes with Node) to install dependencies.

### Steps

1. Clone this repository:
    ```bash
    git clone https://github.com/mirmashhouri/react-mobx-ts-starter
    ```
2. Navigate into the project directory:
    ```bash
    cd react-mobx-ts-starter
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Folder and File Descriptions

- **`src/app/Router`**: Contains routing configuration for the application.
- **`src/app/context.ts`**: Defines context and shared state for the application.
- **`src/app/coreContext.ts`**: Core context setup and initialization.
- **`src/components`**: Contains reusable UI components.
- **`src/pages`**: Contains individual pages of the application, like `Home.tsx`.
- **`src/stores`**: MobX stores for state management.
- **`src/styles`**: SCSS files for styling.
- **`src/types`**: TypeScript type definitions.
- **`src/utils`**: Helper functions and utilities.
- **README files**: Additional documentation for API requests, ESLint, Jest, resources, slider, styles, translations, and Webpack configurations.

## Documentation

Each aspect of the project is documented in dedicated files:

- `README_API-REQUESTS.md`: Documentation for API requests.
- `README_ESLINT.md`: Documentation for ESLint setup.
- `README_JEST.md`: Documentation for Jest testing.
- `README_RESOURCES.md`: Resource references for project dependencies.
- `README_SLIDER.md`: Details on using the slider component.
- `README_STYLES.md`: Guide to the SCSS structure and styling conventions.
- `README_TRANSLATIONS.md`: Instructions on managing translations.
- `README_WEBPACK.md`: Overview of Webpack configuration.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve this boilerplate.

## License

This project is licensed under the MIT License.
