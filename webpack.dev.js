const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'img/[name][ext]', // bundle images
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader', // 3. Inject styles into DOM
                    'css-loader', // 2. Turn CSS into commonJS
                    'sass-loader', // 1. Turn SASS into CSS
                ],
            },
        ],
    },
});
