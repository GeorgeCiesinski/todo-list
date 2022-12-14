const path = require('path');
const common = require("./webpack.common");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "img/[name].[hash][ext]",  // bundle images with hash in name
    clean: true,  // Cleans dist folder before build
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new CssMinimizerPlugin(),
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,  // 3. Extract CSS into files
          "css-loader",    // 2. Turn CSS into commonJS
          "sass-loader",   // 1. Turn SASS into CSS
        ]
      }
    ]
  }
});