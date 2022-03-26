const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
require('@babel/register');

module.exports = env => {
    return {
        entry: ['./src/js/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: '[name].js'
        },
        devtool: 'source-map',
        // ...
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }, {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: ['style-loader',
                {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sassOptions: { outputStyle: 'expanded' }
                    }
                }]
            }]
        },
        // ...
        plugins: [
            new htmlWebpackPlugin({
                template: 'src/index.html',
                filename: 'index.html',
                hash: true
            }),
            new webpack.DefinePlugin({
                'API_URL': JSON.stringify(env.API_URL)
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            }),
        ]
    }
};