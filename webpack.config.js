var webpack = require("webpack");

module.exports = {
    entry: {
        'polyfills': './build/showcase/polyfills.js',
        'vendor': './build/showcase/vendor.js',
        'app': './build/showcase/main.js'
    },
    output: {
        path: __dirname,
        filename: "./prod/[name].js"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        })
    ]
};
