const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
    baseLayout: "./src/baseLayout.js",
    modifyDom: "./src/modifyDom.js",
    nav: "./src/navLinks.js",
    copyright: "./src/copyright.js",
    settings: "./src/settingsUtils.js",
    about: "./src/aboutUtils.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Todo App", // Creates a new index.html file from the template
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  optimization: {
    runtimeChunk: "single", // For multiple entry points
  },
};
