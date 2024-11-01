## [Jest](https://jestjs.io/)

[Jest](https://jestjs.io/) is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.

The jest configuration can be found at: [jest.config.js](jest.config.js)



--------------------------------------------------------------------------

#### [TS-Jest](https://www.npmjs.com/package/ts-jest)

A TypeScript preprocessor with source map support for Jest that lets you use Jest to test projects written in TypeScript.

Because of the fact that the project uses the TypeScript compiler to transpile code, not [Babel](https://babeljs.io/), ts-jest is the perfect choice to go along with typescript. 

Docs: https://kulshekhar.github.io/ts-jest/docs/




--------------------------------------------------------------------------

#### [jest.config.js](jest.config.js)

The configuration uses the 'ts-jest' preset.

Path aliasing is handled with the help of ts-jest's helper function, which automatically takes the paths info from  [tsconfig.json](tsconfig.json) and maps it to the expected jest format for moduleNameMapper.

More info about: 

ts-jest helper: https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping

moduleNameMapper: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring