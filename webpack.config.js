const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry: {
        app: ['./src/App.jsx'],
        vendor: ['react', 'react-dom', 'whatwg-fetch', 'babel-polyfill', 'react-router-dom','react-router','prop-types', 'qs', 'bootstrap', 'jquery', 'popper.js', 'react-router-bootstrap', 'react-bootstrap'],
    },

    output: {
        path: path.join(__dirname, './static'), //path has to be an absolute path instead of a relative path
        filename: 'app.bundle.js'
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({name:'vendor', filename:'vendor.bundle.js'}),     
        new webpack.NamedChunksPlugin(),
    ],

    module:{
        rules:[
            {
                test: /\.jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                }
            },
        ]
    },
    devServer: {
        port: 2333,
        contentBase: path.join(__dirname, './static'),
        proxy: {
            '/api/*':{
                target: 'http://localhost:3000'
            }
        },
        historyApiFallback: true,
    },
    devtool: 'source-map',
};