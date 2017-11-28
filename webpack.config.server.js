const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const webpackConfig = require('./webpack.config');
const globals = require('./src/config/globals');

module.exports = {
    name: 'server',
    devtool: 'cheap-source-map',
    target: 'node',
    node: { __dirname: true },
    externals: [nodeExternals({ whitelist: /\.(?!js(\?|$))([^.]+(\?|$))/ })],
    entry: ['./src/server/index.js'],
    output: {
        path: webpackConfig.output.path,
        filename: 'server.js',
        publicPath: '/',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.svg$/,
                loader: 'babel-loader!svg-react-loader',
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: 'url-loader?limit=10000&name=images/[hash].[ext]',
            },
            {
                exclude: [
                    /\.jsx?$/,
                    /\.css$/,
                    /\.svg$/,
                    /\.(jpe?g|png|gif)$/i,
                    /\.json$/,
                ],
                loader: 'file-loader',
                options: { name: 'static/[name].[ext]' },
            },
        ],
    },
    plugins: [new webpack.DefinePlugin(globals('server'))],
    resolve: webpackConfig.resolve,
};
