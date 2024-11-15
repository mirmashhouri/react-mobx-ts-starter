# [Webpack](https://webpack.js.org/)

[Webpack](https://webpack.js.org/) is a module bundler. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging.

webpack's documentation: https://webpack.js.org/concepts/

This documentation assumes that you have a basic understanding of what webpack is used for and the basic concepts of webpack. Such as:

- What's a bundle
- What's an entrypoint - https://webpack.js.org/concepts/#entry

<br>

---

#### Intro

Bacause of the architecture of the project, it's not the typical single page application architecture that normally goes along with some react projects. Each specific page on the website has it's own js bundle and css bundle.
This is due to the fact that the application doesn't have a single entrypoint and the routing is handled on the .NET back-end.

then, in the html of the page, we would expect to have a script tag referencing the js bundle.


We would also, most likely have a link to the css bundle.

What's important to understand here, is that these bundles would be specific to this page of the application. Basically, the idea is that if we have 2 pages: `page A` and `page B`, the code for `page A` doesn't need to be loaded on `page B`.

<br>


<br>

##### Creating bundles

1. Create a file in the `src/pages` directory with some code.

   - It must be in this exact directory. The configuartion specifically looks for files in `src/pages`.
   - Only top level files in the `src/pages` directory are considered as entrypoints. Directories that are deeper into the `src/pages` directory are ignored.
     If you have `src/pages/user/details.tsx`, it will be ignored and no new bundle for that file will be created (It won't be considered as an entrypoint).

2. Open up a terminal in the root directory of the package.json file (on the same level as the configuration).

3. Run the following command:
   `npm run start` + `Press [Enter]`

A new bundle should have been created in `bundles/js/`.

<br>

##### Additional info on bundles

- The name of the file in `src/pages` is used for the names of the bundles.

  <br>

- Files ending in `.map` are the source-map files for local development. (Source-maps are currently turned off for production).
  If you don't know what are source-maps, here's a link:
  https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map
  <br>

- If there are no `.scss` or `.css` imports, there won't be a css bundle generated for that entrypoint.
  If you don't see your styles on the page, it might be because you forgot to import them in a page or a child react component.
  (This does **_not_** mean that the style files need to be imported in the top TS or JS file. It's fine to import a style file in any TS or JS file. In general, it is advised to keep styles that are related to a component, next to it's definition.)
  E.g., if a react component has an `import './styles.scss'`, but the page doesn't have any styles. A css bundle will still be genereated, because there is a scss file being imported somewhere in the import dependency tree.

  <br>

---


The file exports an object with key-value pairs in the form:

```css
{
  <file-name> : {
    import: '/pages/<file-name>',
    dependOn: 'shared',
    },

    ...

}
```

  <br>

---

#### Why are there random hex values in the names of the generated bundles?

Basically, browsers are very good at caching javascript files and css files for longer periods of time.
This is good for performance, since the browser can get the file from the user's computer if they've already visited the page before.

However, when we make changes to the code, we want the user's browser to get the new version of the file. Thus, we have a small problem. How do we tell the browser to get the new version of the file?

This is were content hashes (those random hex values) come into play.
Those values are generated with a SHA algorithm, based on the content in the file.

What this means is that when there is a change to the content of a file, a new hash is generated. If the content is the same (no changes), the hash value remains the same.

When the browser sees the name of the file with the new hash, even if the file was previously cached by the browser, it will no longer match with any of the names of the files that the browser has cached. Thus, the browser will be forced to get the new version of the file.

More in-depth info at:
https://webpack.js.org/guides/caching/

  <br>

---

#### Path Aliasing

The project has been configured so that you can more easily import modules even if they are deeply nested.

Example:

```js
import { myComponent } from '../../../../../components/myComponent;
```

becomes

```js
import { myComponent } from components/myComponent;
```

  <br>

##### Shortcuts

Shortcuts have been created for the following directories:

- `api`
- `app`
- `components`
- `pages`
- `stores`
- `styles`
- `utils`

  <br>

##### Where to configure these shortcuts

2 places require changes: `tsconfig.json` and `webpack.config.js`

In `tsconfig.json`, it's under the `paths` property.
More info at: https://www.typescriptlang.org/tsconfig#paths

In `webpack.config.js`, it's under the `resolve -> alias` property

```js
resolve: {
  alias: {
  }
}
```

  <br>

More info at: https://webpack.js.org/configuration/resolve/

  <br>

---
