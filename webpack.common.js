const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
        modifyDom: './src/modifyDom.js',
        modal: './src/modal.js',
        nav: './src/navLinks.js',
        copyright: './src/copyright.js',
        lists: './src/lists.js',
        listsEvents: './src/listsEvents.js',
        listsLinks: './src/listsLinks.js',
        listsUtilities: './src/listsUtilities.js',
        todos: './src/todos.js',
        todosEvents: './src/todosEvents.js',
        settings: './src/settings.js',
        settingsUtilities: './src/settingsUtilities.js',
        about: './src/about.js',
        colorTheme: './src/colorTheme.js',
        color: './src/lib/color.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo App', // Creates a new index.html file from the template
            template: './src/template.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: ['html-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        runtimeChunk: 'single', // For multiple entry points
    },
};
