const fs = require("fs");
const path = require("path");

const prefix = "/pages/";
const pageFolder = "./src/pages";

const entries = {
  shared: [
    "react",
    "react-dom",
    "mobx",
    "mobx-react-lite",
    "classnames",
    "./api/EndpointClass/endpointClass.ts",
    "app",
  ],

  appShell: {
    import: [
      "./styles/global/index.scss",
      // './components/Layout/Header',
      // './components/Layout/Footer',
    ],
    dependOn: "shared",
  },
};

const trimExtension = (fileName) => path.parse(fileName).name;

fs.readdirSync(pageFolder, { withFileTypes: true }).forEach((file) => {
  if (!file.isDirectory()) {
    const fileName = trimExtension(file.name);
    entries[fileName] = {
      import: prefix + fileName,
      dependOn: "shared",
    };
  }
});

module.exports = entries;
