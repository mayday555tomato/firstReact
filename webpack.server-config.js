
const path = require('path');
const webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: ['./server/server.js','./node_modules/webpack/hot/poll?1000'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs',
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    externals: [/^[a-z]/],
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015'],
                },
            },{
                test: /\.(js|jsx)$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                },
            },
        ],
    },
    devtool: 'source-map',
};