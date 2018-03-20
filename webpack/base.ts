import * as path from 'path';
import { omit } from 'lodash';
const packg = require('../package.json');

// select the vendors you want to include in the vendors chunk
// omit packages you don't want to include
const vendors = Object.keys(omit(packg.dependencies, [
    'compression',
    'express',
    'prop-types',
]));

const srcPath = (p: string) => path.resolve(__dirname, '..', 'src/', p);

const baseConfig = {
    mode: 'production',
    devtool: 'cheap-source-map',
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        publicPath: '/',
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'vendors',
                    test: new RegExp(
                        vendors.reduce((str, vendor) => `${str}|${vendor}`, '^.*(') + ')$',
                        'gi',
                    ),
                    chunks: 'initial',
                    enforce: true,
                },
            },
            // Files will invalidate i. e. when more chunks with the same vendors are added.
            // tslint:disable-next-line:max-line-length
            // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
            name: false,
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader', {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            module: 'commonjs',
                            target: 'esnext',
                        },
                    },
                }],
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        resource: /external/,
                        loader: 'url-loader?limit=10000',
                        query: { limit: 10000 },
                        oneOf: [],
                    },
                    {
                        loader: 'babel-loader!svg-react-loader',
                        oneOf: [],
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                oneOf: [
                    {
                        resource: /external/,
                        loader: 'file-loader',
                        query: { name: 'static/[name].[ext]' },
                        oneOf: [],
                    },
                    {
                        loader: 'url-loader',
                        query: { limit: 10000 },
                        oneOf: [],
                    },
                ],
            },
            {
                exclude: [
                    /\.js$/,
                    /\.tsx?$/,
                    /\.css$/,
                    /\.svg$/,
                    /\.(jpe?g|png|gif)$/i,
                    /\.json$/,
                ],
                loader: 'file-loader',
                query: { name: 'static/[name].[ext]' },
                oneOf: [],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.ts', '.tsx'],
        alias: {
            app: srcPath('app'),
            common: srcPath('app/components/common'),
            components: srcPath('app/components'),
            config: srcPath('config'),
            ducks: srcPath('app/ducks'),
            fonts: srcPath('app/static/fonts'),
            images: srcPath('app/static/images'),
            modules: srcPath('app/components/modules'),
            server: srcPath('server'),
            services: srcPath('app/services'),
            styles: srcPath('app/styles'),
            vectors: srcPath('app/static/vectors'),
        },
    },
};

export default baseConfig;
