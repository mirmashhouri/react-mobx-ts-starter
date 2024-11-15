const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const entries = require("./entrypoints.config");

module.exports = (env) => {
  const isProd = env.production;
  const isDev = !isProd;

  // style files regexes
  const cssRegex = /\.css$/;
  const cssModuleRegex = /\.module\.css$/;
  const sassRegex = /\.(scss|sass)$/;
  const sassModuleRegex = /\.module\.(scss|sass)$/;
  const cssModuleLocalIdent = isProd
    ? "[hash:base64:6]"
    : "[path][name]__[local]";

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: require.resolve("css-loader"),
        options: {
          url: false,
          ...cssOptions,
        },
      },
      {
        loader: require.resolve("postcss-loader"),
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
      });
    }
    return loaders;
  };

  return {
    mode: isProd ? "production" : "development",

    performance: {
      hints: false,
    },

    optimization: {
      minimize: isProd ? true : false,
    },

    devtool: isProd ? undefined : "eval-cheap-module-source-map",

    context: path.resolve(__dirname, "src"),

    entry: entries,

    output: {
      filename: isProd ? "js/[name][contenthash:8].js" : "js/[name].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
      globalObject: "this",
      clean: true, // Clean the output directory before emitting new files
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      compress: true
    },
    module: {
      rules: [
        {
          test: /\.?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ['lodash'],
              presets: ["@babel/preset-env", "@babel/preset-react", { modules: false, targets: { node: 4 } }],
            },
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: {
              // disable type checker - we will use it in fork plugin
              transpileOnly: true,
            },
          },
          exclude: /(node_modules|bower_components)/,
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              compileType: "icss",
            },
          }),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
        // using the extension .module.css
        {
          test: cssModuleRegex,
          use: getStyleLoaders({
            importLoaders: 1,
            modules: {
              compileType: "module",
              localIdentName: cssModuleLocalIdent,
            },
          }),
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        // By default we support SASS Modules with the
        // extensions .module.scss or .module.sass
        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              modules: {
                compileType: "icss",
              },
            },
            "sass-loader"
          ),
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Adds support for CSS Modules, but using SASS
        // using the extension .module.scss or .module.sass
        {
          test: sassModuleRegex,
          use: getStyleLoaders(
            {
              importLoaders: 3,
              modules: {
                compileType: "module",
                localIdentName: cssModuleLocalIdent,
              },
            },
            "sass-loader"
          ),
        },

        // exposing React, ReactDOM, because ReactJS.net needs it on the global object
        {
          test: require.resolve("react"),
          loader: "expose-loader",
          options: {
            exposes: "React",
          },
        },
        {
          test: require.resolve("react-dom"),
          loader: "expose-loader",
          options: {
            exposes: "ReactDOM",
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|ico|css)$/i,
          exclude: /node_modules/,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [
          { from: path.join(__dirname, "public/assets"), to: "assets" },
          { from: path.join(__dirname, "src/styles/abstract/theme_defaults.css"), to: "styles" },
          { from: path.join(__dirname, "public/manifest.json"), to: "./" },
          { from: path.join(__dirname, "public/config.json"), to: "./" },
          { from: path.join(__dirname, "public/locales"), to: "locales" },
        ],
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: path.join(__dirname, "public", "index.html"),
        favicon: path.join(__dirname, "public", "favicon.ico"),
        manifest: path.join(__dirname, "public", "manifest.json"),
        minify: false, // Disable minification to better inspect the output
        scriptLoading: 'defer', // Ensure scripts are deferred
      }),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          configFile: "../tsconfig.json",
        },
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? "css/[name][contenthash:8].css" : "css/[name].css",
      }),
      new MomentLocalesPlugin({
        localesToKeep: ["en", "de"],
      }),
      new LodashModuleReplacementPlugin,
    ],
    resolve: {
      alias: {
        components: path.resolve(__dirname, "./src/components/"),
        stores: path.resolve(__dirname, "./src/stores/"),
        styles: path.resolve(__dirname, "./src/styles/"),
        utils: path.resolve(__dirname, "./src/utils/"),
        api: path.resolve(__dirname, "./src/api/"),
        pages: path.resolve(__dirname, "./src/pages/"),
        app: path.resolve(__dirname, "./src/app/"),
        images: path.resolve(__dirname, "./src/images"),
        public: path.resolve(__dirname, "./public"),
      },
      extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".scss"],
      fallback: { timers: false },
    },
  };
};
