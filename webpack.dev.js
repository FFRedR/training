const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common("development"), {
    watch: true,
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        hot: false,
        inline: false,
        progress: true,
        compress: false,
        port: 8000,
        open: true,
        watchContentBase: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    plugins: [
    ]
})