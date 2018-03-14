const env = process.env.NODE_ENV || 'development';

module.exports = type => ({
    'process.env': {
        NODE_ENV: JSON.stringify(env),
        PORT: process.env.PORT || 3000,
    },
    __DEV__: env === 'development',
    __PROD__: env === 'production',
    __ACC__: env === 'acceptation',
    __CLIENT__: type === 'client',
    __SERVER__: type === 'server',
});
