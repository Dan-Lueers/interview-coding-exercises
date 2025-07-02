const { watch } = require("fs");
const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  mode: "development",
  entry: "./index.ts",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
    ],
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
};
// This configuration file sets up Webpack to bundle a Node.js application.
// It specifies the entry point, output directory, and filename for the bundled code.
// It also uses Babel to transpile modern JavaScript syntax to a version compatible with older Node.js versions.
// The `nodeExternals` plugin is used to exclude `node_modules` from the bundle, which is common in Node.js applications to avoid bundling external dependencies.
// The `watch` option is set to `true`, allowing Webpack to automatically rebuild the bundle whenever files change, which is useful during development.
// The `publicPath` is set to `/dist/`, which is the path where the bundled files will be served from, allowing the application to access the bundled code correctly in a web environment if needed.
// The `babel-loader` is configured to use the `@babel/preset-env` preset, which allows the use of modern JavaScript features while ensuring compatibility with a wide range of Node.js versions.
// This setup is typical for a Node.js application that needs to be bundled for deployment or distribution, ensuring that all necessary code is included in a single file while maintaining compatibility with the Node.js runtime environment.
