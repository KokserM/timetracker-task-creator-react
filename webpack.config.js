const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        background: './src/background.js',
        contentScript: './src/contentScript.js'
        // Include others if needed (popup, options, etc.).
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'images', to: 'images' },
                { from: 'icons', to: 'icons' },
                { from: 'manifest.json', to: 'manifest.json' }
            ]
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
    optimization: {
        minimize: true
    }
};
