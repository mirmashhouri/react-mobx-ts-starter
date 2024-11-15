# [ESLint](https://eslint.org/)

[ESLint](https://eslint.org/) is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code,
with the goal of making code more consistent and avoiding bugs.

#### Getting started doc: https://eslint.org/docs/user-guide/getting-started

<br>

---

#### VSCode Extension

For VSCode users, there is a handy extension for it, however you still need to install the npm package for eslint.
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

The extension starts up a local server, on the same directory level that VSCode is opened.
Basically, the easiest way to get the extension to detect the eslint config file, is to open up VSCode on the root directory of the front-end configuration.

<br>

#### VSCode settings

Additional VSCode settings might need to be changed, in order to configure VSCode to format JSX / TSX files.
VSCode options can be opened up with: `Ctrl + Shift + P` and typing: `open settings (JSON)`
The extension page has more information about what settings are available.

<br>

#### Recommended VSCode settings

```json
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "eslint.format.enable": true,
  "workbench.iconTheme": "material-icon-theme",
  "workbench.editorAssociations": {
    "*.md": "vscode.markdown.preview.editor"
  },
  "editor.codeActionsOnSave": {

    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"],

  "[javascriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.accessibilitySupport": "off",
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "javascript.updateImportsOnFileMove.enabled": "never",
  "[css]": {
    "editor.defaultFormatter": "sibiraj-s.vscode-scss-formatter"
  }
```

<br>

---

#### ESLint configuration for this project

- The configuration is located in a .eslintrc.json file. It should be on the same level as this file (in the root of the directory).

- The configuration includes the general eslint rules and React's general jsx rules

- The configuration also includes the rules of the popular airbnb style guide and typescript. https://www.npmjs.com/package/eslint-config-airbnb-typescript
