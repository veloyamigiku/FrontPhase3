const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: ['./lib/index.js'],
    output: {
        path: `${__dirname}/dist`,
        // webpack-dev-server起動中にjsの変更を反映する。
        publicPath: '/dist/',
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
};
